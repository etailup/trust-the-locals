const UNSPLASH_HOST = 'images.unsplash.com';

const CARD_IMAGE_WIDTHS = [480, 768, 1024, 1280];

export const cardImageSizes =
  '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

const parseDimension = (value: string | null) => {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : null;
};

export const buildResponsiveSrcSet = (url?: string) => {
  if (!url || !url.startsWith('http')) return undefined;
  if (!url.includes(UNSPLASH_HOST)) return undefined;

  try {
    const base = new URL(url);
    const baseW = parseDimension(base.searchParams.get('w'));
    const baseH = parseDimension(base.searchParams.get('h'));
    const ratio = baseW && baseH ? baseH / baseW : null;

    return CARD_IMAGE_WIDTHS.map((width) => {
      const next = new URL(base.toString());
      next.searchParams.set('w', String(width));
      if (ratio) {
        next.searchParams.set('h', String(Math.round(width * ratio)));
      }
      return `${next.toString()} ${width}w`;
    }).join(', ');
  } catch {
    return undefined;
  }
};
