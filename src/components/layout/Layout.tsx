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
      <Header />
      <main className={getMainClass()}>{children}</main>
      <Footer heart={HEART_EMOJI[colorKey] || "🩷"} />
    </div>
  );
};
