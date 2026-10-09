import sleepy from "@/assets/hobbies/sleeping.webp";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDocumentTitle } from "@/hooks/use-document-title";

const NotFound = () => {
  useDocumentTitle("Page not found");
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <img src={sleepy} alt="Dzidzi asleep" className="w-72 sm:w-96 mx-auto mb-6" />
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! This page is taking a nap.</p>
        <Link to="/" className="font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-4">
          Return to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
