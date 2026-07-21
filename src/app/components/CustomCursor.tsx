import { useEffect, useRef, useState } from "react";

import { ACCENT } from "../theme";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let rafId: number;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      if (isHidden) setIsHidden(false);
      mouseX = e.clientX;
      mouseY = e.clientY;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (cursor) {
          cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        }
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if we are hovering a clickable element
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isHidden]);

  if (isTouch) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          /* Hide default cursor everywhere */
          * {
            cursor: none !important;
          }
        }
      `}</style>
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isActive ? "52px" : "12px",
          height: isActive ? "52px" : "12px",
          marginLeft: isActive ? "-26px" : "-6px",
          marginTop: isActive ? "-26px" : "-6px",
          borderRadius: "50%",
          backgroundColor: isActive ? "transparent" : ACCENT,
          border: isActive ? `1.5px solid ${ACCENT}` : "none",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: isHidden ? 0 : (isActive ? 0.8 : 1),
          transition: "width 0.35s cubic-bezier(0.19, 1, 0.22, 1), height 0.35s cubic-bezier(0.19, 1, 0.22, 1), margin 0.35s cubic-bezier(0.19, 1, 0.22, 1), background-color 0.2s, border 0.2s, opacity 0.3s ease",
          willChange: "transform, width, height, margin"
        }}
      />
    </>
  );
}
