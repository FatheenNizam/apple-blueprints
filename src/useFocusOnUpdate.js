import { useRef, useEffect } from "react";

export function useFocusOnUpdate() {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const previousOverflow = document.body.style.overflow;

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    if (element && isDesktop) {
      document.body.style.overflow = "hidden";

      const focusTimeout = setTimeout(() => {
        if (element.focus) {
          element.focus();
        }
      }, 0);

      return () => {
        clearTimeout(focusTimeout);
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [ref]);

  return ref;
}
