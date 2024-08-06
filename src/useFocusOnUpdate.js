import { useRef, useEffect } from "react";

export function useFocusOnUpdate(isModalOpen) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const previousOverflow = document.body.style.overflow;

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    }

    if (element) {
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
  }, [ref, isModalOpen]);

  return ref;
}
