import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, User, FolderOpen, ScrollText, BookOpen } from "lucide-react";

const TABS = [
  { path: "/", label: "Home", icon: Home },
  { path: "/about", label: "About", icon: User },
  { path: "/portfolio", label: "Work", icon: FolderOpen },
  { path: "/resume", label: "Resume", icon: ScrollText },
  { path: "/blog", label: "Blog", icon: BookOpen },
];

/** Phones: the menu lives in a floating bar at the bottom of the screen, within thumb reach. */
export const TabBar = () => {
  const { pathname } = useLocation();
  const current = (path: string) => (path === "/" ? pathname === "/" : pathname.startsWith(path));
  return (
    <nav
      aria-label="Main"
      className="md:hidden fixed inset-x-3 z-50 rounded-full border-[1.5px] border-foreground bg-background/90 backdrop-blur-md p-1 flex justify-between"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)", boxShadow: "var(--brutal-shadow)" }}
    >
      {TABS.map((t) => {
        const active = current(t.path);
        return (
          <Link
            key={t.path}
            to={t.path}
            aria-current={active ? "page" : undefined}
            className={`relative flex-1 flex flex-col items-center gap-0.5 rounded-full py-1.5 text-[10px] font-bold uppercase tracking-wide ${
              active ? "text-primary-foreground" : "text-foreground"
            }`}
          >
            {active && (
              <motion.span
                layoutId="tab-active"
                className="absolute inset-0 rounded-full bg-primary border-[1.5px] border-foreground"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <t.icon className="relative h-5 w-5" aria-hidden />
            <span className="relative">{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
