import { useEffect, useState } from "react";
import { CREAM, DARK, DISPLAY, BODY } from "../theme";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show the preloader once per session
    const hasLoaded = sessionStorage.getItem("hasLoadedPreloader");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    let currentProgress = 0;
    const interval = setInterval(() => {
      // Increment progress randomly
      currentProgress += Math.floor(Math.random() * 12) + 4;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // Hold at 100% briefly before dismissing
        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem("hasLoadedPreloader", "true");
        }, 500);
      }
      setProgress(currentProgress);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!loading && progress === 0) return null; // Already loaded in previous session

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999999,
        backgroundColor: DARK,
        color: CREAM,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: loading ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 1s cubic-bezier(0.7, 0, 0.3, 1)",
        pointerEvents: loading ? "all" : "none",
      }}
    >
      <div style={{ overflow: "hidden" }}>
        <h1
          style={{
            fontFamily: DISPLAY,
            fontWeight: 900,
            fontSize: "clamp(1.8rem, 5vw, 4rem)",
            letterSpacing: "0.08em",
            margin: 0,
            textTransform: "uppercase",
            transform: loading && progress > 5 ? "translateY(0)" : "translateY(100%)",
            transition: "transform 1s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          Fannisa Azzuri
        </h1>
      </div>
      
      <div
        style={{
          position: "absolute",
          bottom: "3rem",
          fontFamily: BODY,
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          opacity: loading ? 0.4 : 0,
          transition: "opacity 0.4s",
        }}
      >
        {progress}%
      </div>
    </div>
  );
}
