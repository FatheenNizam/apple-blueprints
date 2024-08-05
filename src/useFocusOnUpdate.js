import { useEffect, useRef } from "react";

export function useFocusOnUpdate() {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (element) {
      const timeoutId = setTimeout(() => {
        element.focus();
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, []);
  return ref;
}
