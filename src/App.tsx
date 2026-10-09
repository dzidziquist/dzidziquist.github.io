import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, HashRouter,  Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { MotionProvider } from "@/hooks/use-motion";
import Index from "./pages/Index";
const About = lazy(() => import("./pages/About"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Resume = lazy(() => import("./pages/Resume"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// A copy opened straight from disk (file://) or the hosted preview has no server paths, so it keeps #/ addresses.
const Router = window.location.protocol === "file:" || import.meta.env.VITE_SAMPLE ? HashRouter : BrowserRouter;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <MotionProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* Clean addresses (/about). The build writes a real page for every route, so GitHub Pages can serve
            them directly; see staticRoutes() in vite.config.ts. */}
        <Router>
          {/* Each page downloads only when visited, so the homepage loads faster. */}
          <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<ProjectDetail />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            {/* Supports both slug and numeric id for backwards compatibility */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </Router>
      </TooltipProvider>
      </MotionProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
