interface FooterProps {
  heart?: string;
}

export const Footer = ({ heart = "🩷" }: FooterProps) => {
  return (
    <footer className="border-t border-foreground bg-background">
      <div className="container mx-auto px-6 py-4">
        <p className="mono-label !text-[0.65rem] text-muted-foreground text-center">
          <span
            className="pop-hover pop-sm inline-block px-2 py-0.5 rounded-full border border-foreground font-bold uppercase tracking-wide cursor-default"
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
