import { useState, useCallback, CSSProperties, memo } from 'react';
import { buildPlaceholderUrl } from '@/utils/imageSrcSet';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  srcSet?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage = ({
  src,
  alt,
  className = '',
  style,
  srcSet,
  sizes,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  onLoad,
  onError,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const placeholderUrl = buildPlaceholderUrl(src);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  if (hasError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={style}
      >
        <span className="text-gray-400 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className="relative" style={style}>
      {/* Blur placeholder - visible until main image loads */}
      {placeholderUrl && !isLoaded && (
        <img
          src={placeholderUrl}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover blur-md scale-105 ${className}`}
          style={{ ...style, filter: 'blur(20px)', transform: 'scale(1.1)' }}
        />
      )}

      {/* Main image */}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={style}
        srcSet={srcSet}
        sizes={sizes}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default memo(OptimizedImage);
