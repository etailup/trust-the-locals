import { memo, useEffect, useState, useRef, useCallback } from 'react';
import LocalCard from './LocalCard';
import { Local } from '@/data/mockLocals';

interface VirtualizedGridProps {
  items: (Local & { categoryDisplay: string })[];
}

// Row height including gap
const ROW_HEIGHT = 620;
const GAP = 24;
const ROW_HEIGHT_WITH_GAP = ROW_HEIGHT + GAP;
const BUFFER_ROWS = 5;
const PRELOAD_ROWS = 8;
const INITIAL_PRELOAD_COUNT = 9; // First viewport worth of images

// Cache for preloaded images
const preloadedUrls = new Set<string>();

// Extract image URL from a local item
const getImageUrl = (local: Local): string | null => {
  if (local.media && local.media.length > 0) {
    const firstImage = local.media.find(m => m.type === 'image');
    if (firstImage) return firstImage.src;
  }
  return local.image || null;
};

// Preload images with caching (fire and forget)
const preloadImages = (items: Local[], startIdx: number, endIdx: number) => {
  const urls = items
    .slice(startIdx, endIdx)
    .map(getImageUrl)
    .filter((url): url is string => url !== null && !preloadedUrls.has(url));

  urls.forEach(url => {
    preloadedUrls.add(url);
    const img = new Image();
    img.src = url;
    img.decode?.().catch(() => {});
  });
};

// Preload images and wait for them to be ready (returns promise)
const preloadImagesWithPromise = (items: Local[], count: number): Promise<void> => {
  const urls = items
    .slice(0, count)
    .map(getImageUrl)
    .filter((url): url is string => url !== null);

  const promises = urls.map(url => {
    preloadedUrls.add(url);
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        if (img.decode) {
          img.decode().then(() => resolve()).catch(() => resolve());
        } else {
          resolve();
        }
      };
      img.onerror = () => resolve();
      img.src = url;
    });
  });

  return Promise.all(promises).then(() => {});
};

// Skeleton card component
const SkeletonCard = memo(() => (
  <div className="bg-white border border-portal-navy/10 rounded-lg overflow-hidden h-full">
    <div className="bg-gray-200 animate-pulse" style={{ height: 'clamp(18rem, 58vw, 24rem)' }} />
    <div className="p-3 md:p-4 bg-[#FAF7F2]">
      <div className="h-8 bg-gray-200 rounded animate-pulse mb-2 w-3/4" />
      <div className="h-5 bg-gray-200 rounded animate-pulse mb-3 w-full" />
      <div className="flex gap-2">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-20" />
        <div className="h-8 bg-gray-200 rounded animate-pulse w-24" />
      </div>
    </div>
  </div>
));

// Calculate visible range without causing re-renders
const calculateVisibleRange = (
  scrollY: number,
  containerOffset: number,
  viewportHeight: number,
  totalRows: number,
  columnCount: number
) => {
  const scrollOffset = Math.max(0, scrollY - containerOffset);
  const startRow = Math.max(0, Math.floor(scrollOffset / ROW_HEIGHT_WITH_GAP) - BUFFER_ROWS);
  const visibleRowCount = Math.ceil(viewportHeight / ROW_HEIGHT_WITH_GAP) + BUFFER_ROWS * 2;
  const endRow = Math.min(totalRows, startRow + visibleRowCount);

  return { startRow, endRow };
};

interface VisibleRange {
  startRow: number;
  endRow: number;
}

const VirtualizedGrid = ({ items }: VirtualizedGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastRangeRef = useRef<VisibleRange>({ startRow: 0, endRow: 10 });
  const rafIdRef = useRef<number>(0);

  // Only these cause re-renders - and they change infrequently
  const [visibleRange, setVisibleRange] = useState<VisibleRange>({ startRow: 0, endRow: 10 });
  const [columnCount, setColumnCount] = useState(3);
  const [containerHeight, setContainerHeight] = useState(window.innerHeight);

  const totalRows = Math.ceil(items.length / columnCount);
  const totalHeight = totalRows * ROW_HEIGHT_WITH_GAP;

  // Update column count on resize
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 1024) setColumnCount(3);
      else if (width >= 768) setColumnCount(2);
      else setColumnCount(1);
      setContainerHeight(window.innerHeight);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Optimized scroll handler - only updates state when range changes
  const updateVisibleRange = useCallback(() => {
    const containerOffset = containerRef.current?.offsetTop ?? 300;
    const newRange = calculateVisibleRange(
      window.scrollY,
      containerOffset,
      containerHeight,
      totalRows,
      columnCount
    );

    // Only trigger re-render if the range actually changed
    if (
      newRange.startRow !== lastRangeRef.current.startRow ||
      newRange.endRow !== lastRangeRef.current.endRow
    ) {
      lastRangeRef.current = newRange;
      setVisibleRange(newRange);

      // Preload images for upcoming rows
      const preloadStart = newRange.endRow * columnCount;
      const preloadEnd = Math.min(items.length, (newRange.endRow + PRELOAD_ROWS) * columnCount);
      if (preloadStart < preloadEnd) {
        preloadImages(items, preloadStart, preloadEnd);
      }
    }
  }, [containerHeight, totalRows, columnCount, items]);

  // Scroll listener with requestAnimationFrame
  useEffect(() => {
    const onScroll = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(updateVisibleRange);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial calculation
    updateVisibleRange();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [updateVisibleRange]);

  // Preload first batch on mount
  useEffect(() => {
    preloadImages(items, 0, Math.min(items.length, 15));
  }, [items]);

  // Calculate visible items
  const { startRow, endRow } = visibleRange;
  const startIndex = startRow * columnCount;
  const endIndex = Math.min(items.length, endRow * columnCount);
  const visibleItems = items.slice(startIndex, endIndex);
  const offsetTop = startRow * ROW_HEIGHT_WITH_GAP;

  // Group into rows
  const rows: (Local & { categoryDisplay: string })[][] = [];
  for (let i = 0; i < visibleItems.length; i += columnCount) {
    rows.push(visibleItems.slice(i, i + columnCount));
  }

  const gridClass = columnCount === 1
    ? 'grid-cols-1'
    : columnCount === 2
      ? 'grid-cols-2'
      : 'grid-cols-3';

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: totalHeight, minHeight: totalHeight }}
    >
      <div
        className="absolute left-0 right-0"
        style={{ transform: `translateY(${offsetTop}px)` }}
      >
        {rows.map((row, rowIndex) => (
          <div
            key={startRow + rowIndex}
            className={`grid gap-6 mb-6 justify-items-center md:justify-items-stretch ${gridClass}`}
            style={{ height: ROW_HEIGHT }}
          >
            {row.map((local) => (
              <div
                key={local.id}
                className="w-full max-w-md md:max-w-full h-full"
              >
                <LocalCard local={local} />
              </div>
            ))}
            {row.length < columnCount &&
              Array.from({ length: columnCount - row.length }).map((_, i) => (
                <div key={`empty-${i}`} className="w-full" />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(VirtualizedGrid);
