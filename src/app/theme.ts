// ── Shared design tokens ───────────────────────────────────────────────────
// Single source of truth for the visual system introduced in
// "Bold Portfolio Website Design" — used by the Home, Projects Archive,
// and Project Detail pages so the whole app stays visually consistent.

export const CREAM = "#F4F0EA";
export const DARK = "#111111";
export const DARK2 = "#181818";
export const ACCENT = "#C07A5A";

export const DISPLAY = "'Big Shoulders Display', sans-serif";
export const BODY = "'Outfit', sans-serif";

// Project names vary a lot in length ("Bedroom" vs "PlayWorks Pakuwon Mall"),
// but several headings across the site use a single fluid viewport-width
// size for whatever name is passed in. A fixed vw value tuned for a short
// name overflows past the edge of its container for a long one. This scales
// the vw (and rem ceiling) down proportionally to the name's length, using
// an 8-character name as the reference point that keeps existing sizing
// unchanged for short names like "Bedroom" or "Pavilliun".
export const fitTitleSize = (name: string, maxVw: number, maxRem: number, minRem: number) => {
  const factor = Math.min(1, 8 / name.length);
  return `clamp(${minRem}rem, ${(maxVw * factor).toFixed(2)}vw, ${maxRem}rem)`;
};
