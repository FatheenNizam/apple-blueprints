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
  }, []); // No dependencies, so this effect runs on every render
  return ref;
}
