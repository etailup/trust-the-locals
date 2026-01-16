import { useEffect, useRef, useState, useCallback } from 'react';

// Shared IntersectionObserver instance - more efficient than one per component
let sharedObserver: IntersectionObserver | null = null;
const callbacks = new Map<Element, (isIntersecting: boolean) => void>();

const getSharedObserver = (rootMargin: string, threshold: number) => {
  if (!sharedObserver && typeof IntersectionObserver !== 'undefined') {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const callback = callbacks.get(entry.target);
          if (callback) {
            callback(entry.isIntersecting);
          }
        });
      },
      { rootMargin, threshold }
    );
  }
  return sharedObserver;
};

interface UseSharedInViewOptions {
  rootMargin?: string;
  threshold?: number;
}

/**
 * Efficient IntersectionObserver hook that shares a single observer across all components.
 * Once an element is in view, it stays "in view" (one-time trigger for lazy loading).
 */
export const useSharedInView = (options: UseSharedInViewOptions = {}) => {
  const { rootMargin = '300px', threshold = 0 } = options;
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  const handleIntersection = useCallback((isIntersecting: boolean) => {
    if (isIntersecting) {
      setIsInView(true);
      // Once in view, unobserve - no need to track anymore
      if (ref.current) {
        callbacks.delete(ref.current);
        sharedObserver?.unobserve(ref.current);
      }
    }
  }, []);

  useEffect(() => {
    // Already in view, no need to observe
    if (isInView) return;

    const node = ref.current;
    if (!node) return;

    // Fallback for browsers without IntersectionObserver
    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = getSharedObserver(rootMargin, threshold);
    if (!observer) return;

    callbacks.set(node, handleIntersection);
    observer.observe(node);

    return () => {
      callbacks.delete(node);
      observer.unobserve(node);
    };
  }, [isInView, rootMargin, threshold, handleIntersection]);

  return { ref, isInView };
};
