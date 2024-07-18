import { useEffect, RefObject } from 'react';

const usePreventScroll = (ref: RefObject<HTMLElement>): void => {
  useEffect(() => {
    const preventScroll = (event: Event) => {
      event.preventDefault();
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('wheel', preventScroll, { passive: false });
    }

    return () => {
      if (element) {
        element.removeEventListener('wheel', preventScroll);
      }
    };
  }, [ref]);
};

export default usePreventScroll;
