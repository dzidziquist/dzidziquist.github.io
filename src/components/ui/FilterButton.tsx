interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const FilterButton = ({ label, isActive, onClick }: FilterButtonProps) => (
  <button
    className="px-3 py-1.5 text-xs whitespace-nowrap brutal-btn pop-hover pop-sm"
    aria-pressed={isActive}
    style={{
      // Follow the page accent so filters match the rest of the page; hover uses the shared pop effect.
      backgroundColor: isActive ? "hsl(var(--primary))" : "hsl(var(--card))",
      color: isActive ? "hsl(var(--primary-foreground))" : "inherit",
    }}
    onClick={onClick}
  >
    {label}
  </button>
);
