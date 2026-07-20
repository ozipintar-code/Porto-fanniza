import { useEffect, useRef, useState } from "react";

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
          width: isActive ? "44px" : "14px",
          height: isActive ? "44px" : "14px",
          marginLeft: isActive ? "-22px" : "-7px",
          marginTop: isActive ? "-22px" : "-7px",
          borderRadius: "50%",
          backgroundColor: "#fff",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: isHidden ? 0 : 1,
          transition: "width 0.25s cubic-bezier(0.25, 1, 0.5, 1), height 0.25s cubic-bezier(0.25, 1, 0.5, 1), margin 0.25s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease",
          mixBlendMode: "difference",
          willChange: "transform, width, height, margin"
        }}
      />
    </>
  );
}
