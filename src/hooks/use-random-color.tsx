import { useMemo } from "react";

const CARD_COLORS = [
  { accent: "hsl(333 71% 50%)", fg: "hsl(327 73% 97%)", bg: "hsl(333 71% 95%)" },   // pink
  { accent: "hsl(82 85% 45%)", fg: "hsl(82 20% 10%)", bg: "hsl(82 85% 92%)" },      // lime
  { accent: "hsl(270 60% 55%)", fg: "hsl(270 80% 97%)", bg: "hsl(270 60% 92%)" },    // lavender
  { accent: "hsl(45 95% 50%)", fg: "hsl(45 20% 10%)", bg: "hsl(45 90% 92%)" },       // yellow
] as const;

export type RandomColor = (typeof CARD_COLORS)[number];

export const useRandomColor = (): RandomColor =>
  useMemo(() => CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)], []);
