import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export function Modal({ onDismiss, children }) {
  const element = useRef(document.createElement("div"));

  useEffect(() => {
    const parentNode = document.querySelector("#modal");
    parentNode.appendChild(element.current);

    return () => element.current.remove();
  });

  return createPortal(
    <>
      <div
        className="overlay"
        onClick={() => {
          onDismiss();
          console.log("Modal closed");
          document.querySelector("#modal").style.pointerEvents = "none";
        }}
      />
      {children}
    </>,
    element.current
  );
}
