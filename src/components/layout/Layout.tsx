import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isResumePage = location.pathname === "/resume";

  // All pages: flex column layout with footer at bottom
  const getContainerClass = () => {
    if (isHomePage) return "h-screen flex flex-col overflow-hidden";
    if (isResumePage) return "min-h-screen flex flex-col";
    return "min-h-screen flex flex-col";
  };

  const getMainClass = () => {
    if (isHomePage) return "flex-1 overflow-hidden";
    if (isResumePage) return "flex-1 pt-16 md:pt-20";
    return "flex-1 pt-20";
  };

  return (
    <div className={getContainerClass()}>
      <Header />
      <main className={getMainClass()}>{children}</main>
      <Footer />
    </div>
  );
};
