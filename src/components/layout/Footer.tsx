interface FooterProps {
  heart?: string;
}

export const Footer = ({ heart = "🩷" }: FooterProps) => {
  return (
    <footer className="border-t border-foreground bg-background">
      <div className="container mx-auto px-6 py-6">
        <p className="mono-label text-muted-foreground text-center">
          <span
            className="brutal-btn px-1.5 py-0.5 text-xs"
            style={{
              backgroundColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
            }}
          >
            Copyright
          </span>
          {" "}© 2026 Dzidzi Quist. Made with {heart}.
        </p>
      </div>
    </footer>
  );
};
