interface FooterProps {
  heart?: string;
}

export const Footer = ({ heart = "🩷" }: FooterProps) => {
  return (
    <footer className="border-t border-foreground bg-background">
      <div className="container mx-auto px-6 py-6 flex justify-center">
        <span
          className="brutal-btn px-3 py-1 text-xs mono-label"
          style={{ color: 'hsl(var(--primary))' }}
        >
          Copyright © 2026 Dzidzi Quist. Made with {heart}.
        </span>
      </div>
    </footer>
  );
};
