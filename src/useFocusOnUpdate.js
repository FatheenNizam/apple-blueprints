import { useRef, useEffect, useState } from "react";

export function useFocusOnUpdate() {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const element = ref.current;
    const previousOverflow = document.body.style.overflow;

    if (element) {
      document.body.style.overflow = "hidden";
      setIsOpen(true);

      const focusTimeout = setTimeout(() => {
        if (element.focus) {
          element.focus();
        }
      }, 0);

      return () => {
        clearTimeout(focusTimeout);
        document.body.style.overflow = previousOverflow;
        setIsOpen(false);
      };
    } else {
      setIsOpen(false);
    }
  }, [ref]);

  return { ref, isOpen };
}
