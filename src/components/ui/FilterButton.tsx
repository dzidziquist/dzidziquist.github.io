import { useMemo, useState } from "react";

const FILTER_COLORS = [
  { bg: "hsl(333 71% 50%)", fg: "hsl(327 73% 97%)", hoverBg: "hsl(333 71% 60%)" },   // pink
  { bg: "hsl(82 85% 45%)", fg: "hsl(82 20% 10%)", hoverBg: "hsl(82 85% 55%)" },      // lime
  { bg: "hsl(270 60% 55%)", fg: "hsl(270 80% 97%)", hoverBg: "hsl(270 60% 65%)" },   // lavender
  { bg: "hsl(45 95% 50%)", fg: "hsl(45 20% 10%)", hoverBg: "hsl(45 95% 60%)" },      // yellow
] as const;

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const FilterButton = ({ label, isActive, onClick }: FilterButtonProps) => {
  const color = useMemo(
    () => FILTER_COLORS[Math.floor(Math.random() * FILTER_COLORS.length)],
    []
  );
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="px-3 py-1.5 text-xs font-bold uppercase tracking-wide border border-foreground whitespace-nowrap transition-all"
      style={{
        backgroundColor: isActive
          ? color.bg
          : hovered
            ? color.hoverBg
            : "hsl(var(--card))",
        color: isActive || hovered ? color.fg : "inherit",
        boxShadow: isActive ? "var(--brutal-shadow-sm)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
