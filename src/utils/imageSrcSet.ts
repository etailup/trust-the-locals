const UNSPLASH_HOST = 'images.unsplash.com';
const BLOB_HOST = 'public.blob.vercel-storage.com';

const CARD_IMAGE_WIDTHS = [320, 480, 768, 1024, 1280];
const PLACEHOLDER_WIDTH = 20;

export const cardImageSizes =
  '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

const parseDimension = (value: string | null) => {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : null;
};

export const buildResponsiveSrcSet = (url?: string, quality?: number) => {
  if (!url || !url.startsWith('http')) return undefined;
  const isUnsplash = url.includes(UNSPLASH_HOST);
  const isBlob = url.includes(BLOB_HOST);
  if (!isUnsplash && !isBlob) return undefined;

  try {
    const base = new URL(url);
    const baseW = parseDimension(base.searchParams.get('w'));
    const baseH = parseDimension(base.searchParams.get('h'));
    const ratio = baseW && baseH ? baseH / baseW : null;

    return CARD_IMAGE_WIDTHS.map((width) => {
      const next = new URL(base.toString());
      next.searchParams.set('w', String(width));
      if (isUnsplash) {
        if (ratio) {
          next.searchParams.set('h', String(Math.round(width * ratio)));
        }
        if (quality) {
          next.searchParams.set('q', String(quality));
        }
      }
      return `${next.toString()} ${width}w`;
    }).join(', ');
  } catch {
    return undefined;
  }
};

/**
 * Build a tiny placeholder URL (20px wide) for blur-up effect
 */
export const buildPlaceholderUrl = (url?: string): string | undefined => {
  if (!url || !url.startsWith('http')) return undefined;
  const isUnsplash = url.includes(UNSPLASH_HOST);
  const isBlob = url.includes(BLOB_HOST);
  if (!isUnsplash && !isBlob) return undefined;

  try {
    const base = new URL(url);
    base.searchParams.set('w', String(PLACEHOLDER_WIDTH));
    if (isUnsplash) {
      base.searchParams.set('q', '10');
    }
    return base.toString();
  } catch {
    return undefined;
  }
};
