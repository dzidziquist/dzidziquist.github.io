import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMotion } from "@/hooks/use-motion";

// The sticker on the About photo is small, so it uses short forms.
const TEXT = {
  full: { coords: "47.6062° N, 122.3321° W", city: "Seattle, WA" },
  short: { coords: "47.6°N 122.3°W", city: "Seattle" },
};
const GLYPHS = "0123456789°.,NW#";
// The icon shows Seattle's weather right now (Open-Meteo: free, no key, no cookies). Coffee stands in
// if the forecast can't be reached.
const COFFEE = { icon: "☕", label: "coffee" };
const weatherIcon = (code: number, day: boolean) => {
  if (code === 0) return { icon: day ? "☀️" : "🌙", label: day ? "sunny" : "clear night" };
  if (code <= 2) return { icon: day ? "🌤️" : "☁️", label: "partly cloudy" };
  if (code === 3) return { icon: "☁️", label: "cloudy" };
  if (code === 45 || code === 48) return { icon: "🌫️", label: "foggy" };
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return { icon: "❄️", label: "snowing" };
  if (code >= 95) return { icon: "⛈️", label: "thunderstorms" };
  if (code >= 51) return { icon: "🌧️", label: "raining" };
  return COFFEE;
};
const useSeattleWeather = () => {
  const [extra, setExtra] = useState(() => {
    try {
      const saved = sessionStorage.getItem("seattle-weather");
      return saved ? (JSON.parse(saved) as typeof COFFEE) : COFFEE;
    } catch {
      return COFFEE;
    }
  });
  useEffect(() => {
    if (extra !== COFFEE) return;
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 4000);
    fetch("https://api.open-meteo.com/v1/forecast?latitude=47.61&longitude=-122.33&current=weather_code,is_day", { signal: ctrl.signal })
      .then((r) => r.json())
      .then((d: { current?: { weather_code: number; is_day: number } }) => {
        if (!d.current) return;
        const w = weatherIcon(d.current.weather_code, d.current.is_day === 1);
        setExtra(w);
        try {
          sessionStorage.setItem("seattle-weather", JSON.stringify(w));
        } catch {
          /* private mode: just skip the cache */
        }
      })
      .catch(() => {})
      .finally(() => clearTimeout(timeout));
    return () => ctrl.abort();
  }, [extra]);
  return extra;
};

/** Seattle's coordinates type out like a query result, then scramble and resolve into the city name. */
const useDecode = (start: boolean, reduced: boolean, { coords: COORDS, city: CITY }: { coords: string; city: string }) => {
  const [text, setText] = useState(reduced ? CITY : "");
  const [phase, setPhase] = useState<"idle" | "typing" | "resolving" | "done">(reduced ? "done" : "idle");
  useEffect(() => {
    if (!start || reduced) return;
    let i = 0;
    let step = 0;
    setPhase("typing");
    const timer = setInterval(() => {
      if (i < COORDS.length) {
        i += 1;
        setText(COORDS.slice(0, i));
        if (i === COORDS.length) setPhase("resolving");
        return;
      }
      step += 1;
      const keep = Math.floor((step / 14) * CITY.length);
      let out = CITY.slice(0, keep);
      for (let k = keep; k < CITY.length; k++) out += CITY[k] === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      setText(out);
      if (step >= 14) {
        clearInterval(timer);
        setText(CITY);
        setPhase("done");
      }
    }, 45);
    return () => clearInterval(timer);
  }, [start, reduced, COORDS, CITY]);
  return { text, phase };
};

const Pin = () => (
  <svg viewBox="0 0 24 24" className="h-full w-full shrink-0 text-primary" aria-hidden>
    <path d="M12 22s7-6.6 7-12.3A7 7 0 0 0 5 9.7C5 15.4 12 22 12 22z" fill="currentColor" stroke="hsl(var(--foreground))" strokeWidth={1.4} />
    <circle cx="12" cy="9.6" r="2.6" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth={1.2} />
  </svg>
);

/**
 * "Seattle, WA" with a decoding animation. `floating` is the map-style label beside the illustration (tablets and up);
 * `inline` sits under the title on phones, where the picture is too small to carry a label; `sticker` is the bare
 * content for a sticker that brings its own pill.
 */
export const LocationTag = ({ variant, delay = 1200 }: { variant: "floating" | "inline" | "sticker"; delay?: number }) => {
  const { reduced } = useMotion();
  const [start, setStart] = useState(false);
  const extra = useSeattleWeather();
  useEffect(() => {
    const t = setTimeout(() => setStart(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  const { text, phase } = useDecode(start, reduced, TEXT[variant === "sticker" ? "short" : "full"]);
  const showPin = phase === "resolving" || phase === "done";
  const done = phase === "done";

  const content = (
    <>
      <span className={`relative inline-flex shrink-0 ${variant === "sticker" ? "h-[1.1em] w-[1.1em]" : "h-5 w-5"}`}>
        {showPin && (
          <motion.span
            className="inline-flex h-full w-full"
            initial={reduced ? false : { y: -14, scale: 0.6, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 14 }}
          >
            <Pin />
          </motion.span>
        )}
      </span>
      <span
        className={`font-mono ${variant === "sticker" ? "text-[1em]" : "text-sm"} font-bold tabular-nums whitespace-nowrap ${variant === "sticker" ? "" : done ? "text-foreground" : "text-muted-foreground"}`}
        style={{ textTransform: "none" }}
      >
        {text}
        {phase === "typing" && <span className="animate-pulse">▍</span>}
      </span>
      {done && (
        <motion.span
          // Emoji are small bitmaps that blur and stretch when scaled, so this one only fades and drops in.
          className={`inline-block ${variant === "sticker" ? "text-[1em]" : "text-base"} leading-none`}
          role="img"
          aria-label={`Seattle weather: ${extra.label}`}
          initial={reduced ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 }}
        >
          {extra.icon}
        </motion.span>
      )}
    </>
  );

  // Content only, for a sticker that brings its own pill (the About photo).
  if (variant === "sticker") {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="sr-only">Based in Seattle, Washington</span>
        <span aria-hidden className="inline-flex items-center gap-1.5">{content}</span>
      </span>
    );
  }

  if (variant === "inline") {
    return (
      <div className="flex items-center justify-center gap-2 min-h-7 mb-6 md:hidden">
        <span className="sr-only">Based in Seattle, Washington</span>
        <span aria-hidden className="inline-flex items-center gap-2">{content}</span>
      </div>
    );
  }

  // A sticker-style label with a dotted leader line pointing at her, like a note on a map.
  return (
    <motion.div
      className="pointer-events-none absolute right-[78%] top-[10%] z-10 hidden md:flex items-center"
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: start ? 1 : 0, y: start ? 0 : 8 }}
      transition={{ duration: 0.35 }}
    >
      <span className="sr-only">Based in Seattle, Washington</span>
      <span
        aria-hidden
        className="inline-flex items-center gap-2 rounded-full border border-foreground bg-card px-3 py-1.5 -rotate-2"
        style={{ boxShadow: "var(--brutal-shadow-sm)" }}
      >
        {content}
      </span>
      <svg aria-hidden width="56" height="28" viewBox="0 0 56 28" className="-ml-1 mt-6 text-foreground/50">
        <path d="M2 4 C20 4 30 22 52 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" />
        <circle cx="52" cy="24" r="2.5" fill="currentColor" />
      </svg>
    </motion.div>
  );
};
