import { Skeleton } from './skeleton';

interface SkeletonCardProps {
  imageHeight?: string;
}

export const SkeletonCard = ({ imageHeight = 'clamp(18rem, 58vw, 24rem)' }: SkeletonCardProps) => {
  return (
    <div className="bg-white border border-portal-navy/10 rounded-lg overflow-hidden">
      {/* Image skeleton */}
      <Skeleton
        className="w-full rounded-t-lg"
        style={{ height: imageHeight }}
      />

      {/* Content skeleton */}
      <div className="p-4 bg-[#FAF7F2] space-y-3">
        {/* Title */}
        <Skeleton className="h-8 w-3/4" />

        {/* Description */}
        <Skeleton className="h-5 w-full" />

        {/* Tags */}
        <div className="flex gap-2">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-7 w-24" />
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-portal-navy/10">
          <Skeleton className="h-5 w-32" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonGrid = ({ count = 6, columns = 3 }: { count?: number; columns?: number }) => {
  const gridClass = columns === 3
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    : columns === 2
    ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
    : 'grid grid-cols-1 gap-6';

  return (
    <div className={gridClass}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default SkeletonCard;
