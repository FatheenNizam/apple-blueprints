// hooks/useFocusOnUpdate.js
import { useEffect, useRef } from "react";

export function useFocusOnUpdate() {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (element) {
      // Ensure focus is set after the component is updated
      const timeoutId = setTimeout(() => {
        element.focus();
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, []); // Empty dependency array ensures focus is set on initial render and updates

  return ref;
}
