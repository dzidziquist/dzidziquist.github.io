interface FooterProps {
  heart?: string;
}

export const Footer = ({ heart = "🩷" }: FooterProps) => {
  return (
    <footer className="border-t border-foreground bg-background">
      <div className="container mx-auto px-6 py-6">
        <p className="mono-label text-muted-foreground text-center">
          Copyright © 2026 Dzidzi Quist. Made with {heart}.
        </p>
      </div>
    </footer>
  );
};
