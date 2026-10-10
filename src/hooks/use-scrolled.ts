import { useEffect, useState } from "react";

/** True once the page has scrolled down past `offset` pixels. */
export const useScrolled = (offset = 4) => {
  const [scrolled, setScrolled] = useState(() => typeof window !== "undefined" && window.scrollY > offset);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > offset);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [offset]);
  return scrolled;
};
