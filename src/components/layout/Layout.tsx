import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { usePageColor, HEART_EMOJI } from "@/hooks/use-page-color";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isResumePage = location.pathname === "/resume";
  const colorKey = usePageColor();

  const getContainerClass = () => {
    if (isHomePage) return "min-h-[100dvh] flex flex-col";
    if (isResumePage) return "min-h-screen flex flex-col";
    return "min-h-screen flex flex-col";
  };

  const getMainClass = () => {
    if (isHomePage) return "flex-1 flex flex-col";
    if (isResumePage) return "flex-1 pt-16 md:pt-20";
    return "flex-1 pt-20";
  };

  return (
    <div className={getContainerClass()}>
      <a
        href="#main"
        onClick={(e) => {
          // HashRouter owns the URL hash, so move focus without changing it.
          e.preventDefault();
          document.getElementById("main")?.focus();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 brutal-btn bg-primary text-primary-foreground"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className={`${getMainClass()} outline-none`}>{children}</main>
      <Footer heart={HEART_EMOJI[colorKey] || "🩷"} />
      {/* room for the phone tab bar */}
      <div className="h-24 md:hidden" aria-hidden />
    </div>
  );
};
