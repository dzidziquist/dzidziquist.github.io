import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useScrolled } from "@/hooks/use-scrolled";

// Each link carries a small data point, shown under the dock on hover (counts as of the current content).
const navItems = [
  { path: "/", label: "Home", hint: "Say hi" },
  { path: "/about", label: "About", hint: "My story" },
  { path: "/portfolio", label: "Portfolio", hint: "22 projects" },
  { path: "/resume", label: "Resume", hint: "Experience" },
  { path: "/blog", label: "Blog", hint: "11 posts" },
];

const ThemeIcon = ({ mode }: { mode: "system" | "light" | "dark" }) => {
  switch (mode) {
    case "system":
      return <Monitor className="h-5 w-5" />;
    case "light":
      return <Sun className="h-5 w-5" />;
    case "dark":
      return <Moon className="h-5 w-5" />;
  }
};

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { mode, cycleTheme } = useTheme();
  // The line under the menu only appears once content scrolls beneath it.
  const scrolled = useScrolled();

  const [hint, setHint] = useState<string | null>(null);

  return (
    // A floating dock instead of a full-width bar: the logo, the links and the theme button are separate pills
    // that hover over the page. Once you scroll, the logo tucks into its "d" and the dock tightens a little.
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <nav className={`container mx-auto px-4 md:px-6 transition-[padding] duration-300 ${scrolled ? "pt-2" : "pt-3"}`}>
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <Link to="/" className="group pointer-events-auto" aria-label="dzidziquist, home">
            <span className={`logo-pill pop-hover bg-background transition-all duration-300 ${scrolled ? "!pr-[0.4rem]" : ""}`}>
              <span className="logo-mark">d</span>
              <span
                className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                  scrolled ? "max-w-0 opacity-0" : "max-w-[10rem] opacity-100"
                }`}
              >
                dzidziquist
              </span>
            </span>
          </Link>

          {/* Desktop dock */}
          <div className="hidden md:flex flex-col items-center pointer-events-auto">
            <div
              className={`relative flex items-center gap-1 rounded-full border-[1.5px] border-foreground bg-background/85 backdrop-blur-md p-1 transition-shadow duration-300`}
              style={{ boxShadow: scrolled ? "var(--brutal-shadow)" : "var(--brutal-shadow-sm)" }}
              onMouseLeave={() => setHint(null)}
            >
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    aria-current={active ? "page" : undefined}
                    onMouseEnter={() => setHint(`${item.label} · ${item.hint}`)}
                    onFocus={() => setHint(`${item.label} · ${item.hint}`)}
                    onBlur={() => setHint(null)}
                    className={`relative rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
                      active ? "text-primary-foreground" : "text-foreground hover:text-primary"
                    }`}
                  >
                    {/* The highlight slides from link to link */}
                    {active && (
                      <motion.span
                        layoutId="dock-active"
                        className="absolute inset-0 rounded-full bg-primary border-[1.5px] border-foreground"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </Link>
                );
              })}
            </div>
            {/* Data hint under the dock */}
            <div className="h-6 mt-1.5" aria-hidden>
              <AnimatePresence mode="wait">
                {hint && (
                  <motion.span
                    key={hint}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="inline-block mono-label rounded-full border border-foreground bg-background px-2.5 py-0.5"
                  >
                    {hint}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Theme button (desktop) */}
          <button
            onClick={cycleTheme}
            title={`Theme: ${mode}`}
            aria-label={`Theme: ${mode}. Change theme`}
            className="hidden md:flex pointer-events-auto h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-foreground bg-background brutal-btn pop-hover"
          >
            <motion.div
              key={mode}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <ThemeIcon mode={mode} />
            </motion.div>
          </button>

          {/* Mobile buttons */}
          <div className="flex items-center gap-2 md:hidden pointer-events-auto">
            <button
              onClick={cycleTheme}
              title={`Theme: ${mode}`}
              aria-label={`Theme: ${mode}. Change theme`}
              className="h-10 w-10 flex items-center justify-center rounded-full border-[1.5px] border-foreground bg-background brutal-btn pop-hover"
            >
              <ThemeIcon mode={mode} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="h-10 w-10 flex items-center justify-center rounded-full border-[1.5px] border-foreground bg-background brutal-btn pop-hover"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden pointer-events-auto mt-2 rounded-3xl border-[1.5px] border-foreground bg-background"
              style={{ boxShadow: "var(--brutal-shadow)" }}
            >
              <div className="p-3 flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`brutal-btn-hover block rounded-full px-4 py-3 text-sm font-bold uppercase tracking-wide transition-colors border ${
                        location.pathname === item.path
                          ? "bg-primary text-primary-foreground border-foreground"
                          : "border-transparent nav-pop"
                      }`}
                      style={location.pathname === item.path ? { boxShadow: 'var(--brutal-shadow-sm)' } : {}}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
