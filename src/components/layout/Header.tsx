import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/portfolio", label: "Portfolio" },
  { path: "/resume", label: "Resume" },
  { path: "/blog", label: "Blog" },
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
  const [isThemeHovered, setIsThemeHovered] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const location = useLocation();
  const { mode, cycleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-foreground">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group">
            <motion.span 
              className="font-display font-bold text-xl uppercase tracking-tight"
              whileHover={{ scale: 1.02 }}
            >
              dzidziquist
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <motion.div
                  className={`brutal-btn-hover px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors border ${
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground border-foreground"
                      : "border-transparent hover:bg-accent hover:text-accent-foreground"
                  }`}
                  style={location.pathname === item.path ? { boxShadow: 'var(--brutal-shadow-sm)' } : {}}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                </motion.div>
              </Link>
            ))}
            
            {/* Dark Mode Toggle */}
            <button
              onClick={cycleTheme}
              title={`Theme: ${mode}`}
              onMouseEnter={() => setIsThemeHovered(true)}
              onMouseLeave={() => setIsThemeHovered(false)}
              className="ml-2 h-10 w-10 flex items-center justify-center border border-foreground brutal-btn"
              style={isThemeHovered ? {
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
              } : {}}
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
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={cycleTheme}
              title={`Theme: ${mode}`}
              onMouseEnter={() => setIsThemeHovered(true)}
              onMouseLeave={() => setIsThemeHovered(false)}
              className="h-10 w-10 flex items-center justify-center border border-foreground brutal-btn"
              style={isThemeHovered ? {
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
              } : {}}
            >
              <ThemeIcon mode={mode} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              onMouseEnter={() => setIsMenuHovered(true)}
              onMouseLeave={() => setIsMenuHovered(false)}
              className="h-10 w-10 flex items-center justify-center border border-foreground brutal-btn"
              style={isMenuHovered ? {
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
              } : {}}
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
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 flex flex-col gap-2">
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
                      className={`brutal-btn-hover block px-4 py-3 text-sm font-bold uppercase tracking-wide transition-colors border ${
                        location.pathname === item.path
                          ? "bg-primary text-primary-foreground border-foreground"
                          : "border-transparent hover:bg-accent hover:text-accent-foreground"
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
