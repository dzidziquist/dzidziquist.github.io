import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { MotionConfig } from "framer-motion";

interface MotionContextType {
  /** True when the visitor's device asks for reduced motion. */
  reduced: boolean;
}

const MotionContext = createContext<MotionContextType | undefined>(undefined);

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Full motion for everyone, except devices set to "reduce motion" (as Apple does): they keep fades and
 * colour changes but lose movement and automatic animation.
 */
export const MotionProvider = ({ children }: { children: ReactNode }) => {
  const [reduced, setReduced] = useState(() => window.matchMedia(QUERY).matches);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reduced);
  }, [reduced]);

  return (
    <MotionContext.Provider value={{ reduced }}>
      <MotionConfig reducedMotion={reduced ? "always" : "never"}>{children}</MotionConfig>
    </MotionContext.Provider>
  );
};

export const useMotion = () => {
  const ctx = useContext(MotionContext);
  if (!ctx) throw new Error("useMotion must be used within MotionProvider");
  return ctx;
};
