import { useEffect, useRef } from 'react';
import { trackSectionView } from '../utils/analytics';

/**
 * Custom hook that tracks when a section enters the viewport.
 * Uses IntersectionObserver with a 50% visibility threshold
 * and fires the GA4 event only once per section per page load.
 */
export const useSectionTracking = (sectionName: string) => {
  const ref = useRef<HTMLElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTracked.current) {
          hasTracked.current = true;
          trackSectionView(sectionName);
        }
      },
      { threshold: 0.5 } // 50% of section must be visible
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [sectionName]);

  return ref;
};
