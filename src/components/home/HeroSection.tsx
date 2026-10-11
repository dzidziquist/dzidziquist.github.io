import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import lightRest from "@/assets/hero-wave-light-rest.jpg";
import lightMp4 from "@/assets/hero-wave-light.mp4";
import lightWebm from "@/assets/hero-wave-light.webm";
import darkRest from "@/assets/hero-wave-dark-rest.jpg";
import darkMp4 from "@/assets/hero-wave-dark.mp4";
import darkWebm from "@/assets/hero-wave-dark.webm";
import { useMotion } from "@/hooks/use-motion";
import { useTheme } from "@/hooks/use-theme";

// Wave clips (generated with Gemini): typing, she looks up, waves with the hand by the plant, and eases back to typing.
// There is one copy per theme, each rendered on that theme's page colour, so nothing is cut out: no edges, halos
// or transparency for a browser to get wrong. H.264 plays in Safari and on iPad; VP9 is the fallback.
// `ms` is the clip length and `name` when the name shows "Maureen" during it (ms): from when she looks up until
// her hand comes down.
const CLIPS = {
  light: {
    rest: lightRest,
    sources: [{ src: lightMp4, type: "video/mp4" }, { src: lightWebm, type: "video/webm" }],
    ms: 5570,
    name: [1200, 4300] as [number, number],
  },
  dark: {
    rest: darkRest,
    sources: [{ src: darkMp4, type: "video/mp4" }, { src: darkWebm, type: "video/webm" }],
    ms: 4970,
    name: [800, 4200] as [number, number],
  },
};
type Clip = (typeof CLIPS)["light"];

/** Reads a file into memory. Inlined copies (data: URLs) are decoded directly, because some hosts block fetch()
 * for them. */
const loadBlob = async (url: string): Promise<Blob> => {
  if (!url.startsWith("data:")) return (await fetch(url)).blob();
  const [head, body] = url.split(",", 2);
  const type = head.slice(5).split(";")[0];
  const bytes = head.endsWith(";base64") ? Uint8Array.from(atob(body), (c) => c.charCodeAt(0)) : new TextEncoder().encode(decodeURIComponent(body));
  return new Blob([bytes], { type });
};

// Every screen fetches the clip once the page has loaded, so she waves on phones too. Phones set to save data
// keep just the still picture and fetch the clip only when someone taps her.
const saveData = () =>
  !window.matchMedia("(min-width: 768px)").matches &&
  !!(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

/** Typing pose; on cue (load, hover, tap or Enter) she plays the waving clip once and settles back to typing. */
const HeroImage = ({
  clip,
  waving,
  onWave,
  onReady,
  children,
}: {
  clip: Clip;
  waving: boolean;
  onWave: () => void;
  onReady: () => void;
  children?: ReactNode;
}) => {
  const [hovered, setHovered] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [sources, setSources] = useState<string[]>([]);
  const video = useRef<HTMLVideoElement>(null);
  const [requested, setRequested] = useState(() => !saveData());
  const cue = () => {
    setRequested(true);
    onWave();
  };

  // Candidates are tried in order: a blob copy and then the original address of each format, since hosts differ
  // in what they allow for video.
  useEffect(() => {
    if (!requested) return;
    let cancelled = false;
    const urls: string[] = [];
    const load = async () => {
      const probe = document.createElement("video");
      const list: string[] = [];
      for (const s of clip.sources) {
        if (!probe.canPlayType(s.type)) continue;
        try {
          const url = URL.createObjectURL(await loadBlob(s.src));
          urls.push(url);
          list.push(url);
        } catch {
          /* fall through to the original address */
        }
        list.push(s.src);
      }
      if (!cancelled) setSources(list);
    };
    if (document.readyState === "complete") load();
    else window.addEventListener("load", load, { once: true });
    return () => {
      cancelled = true;
      urls.forEach((u) => URL.revokeObjectURL(u));
      window.removeEventListener("load", load);
    };
  }, [clip, requested]);

  useEffect(() => {
    if (ready) onReady();
  }, [ready, onReady]);

  // Play the whole clip each time a wave starts; it always finishes back on the typing pose.
  useEffect(() => {
    if (!waving || !ready) return;
    const v = video.current!;
    v.currentTime = 0;
    v.play().catch(() => setPlaying(false));
  }, [waving, ready]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
      className="flex items-center justify-center"
    >
      <motion.div
        className="relative w-full max-w-[220px] md:max-w-[360px] lg:max-w-[520px] 2xl:max-w-[680px] min-[2200px]:max-w-[820px] select-none aspect-[73/64] cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label="Wave hello"
        onMouseEnter={() => {
          setHovered(true);
          cue();
        }}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        onClick={cue}
        onKeyDown={(e) => {
          if (e.key !== "Enter" && e.key !== " ") return;
          e.preventDefault();
          cue();
        }}
        animate={{ y: hovered ? -6 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        <img
          src={clip.rest}
          alt="Dzidzi, a 3D illustration of a girl with a curly afro coding on a laptop"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <video
          ref={video}
          src={sources[0]}
          aria-hidden
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: playing ? 1 : 0 }}
          onLoadedData={() => setReady(true)}
          onError={() => setSources((s) => s.slice(1))}
          onPlaying={() => setPlaying(true)}
          onEnded={() => setPlaying(false)}
        />
        {children}
      </motion.div>
    </motion.div>
  );
};

export const HeroSection = () => {
  const [showAlternateName, setShowAlternateName] = useState(false);
  const [isWaving, setIsWaving] = useState(false);

  // She waves (and the name swaps to "Maureen") once after load, then again whenever a visitor hovers,
  // taps or presses Enter on her. Each wave lasts under 5 seconds, so no pause control is needed (WCAG 2.2.2).
  // Devices set to reduce motion skip the automatic wave.
  const { reduced } = useMotion();
  const { theme } = useTheme();
  const busy = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  // The current theme's clip timing, read when a wave starts (a ref keeps `wave` stable across theme changes).
  const timing = useRef(CLIPS[theme]);
  timing.current = CLIPS[theme];
  const wave = useCallback(() => {
    if (busy.current) return;
    busy.current = true;
    const { ms, name } = timing.current;
    setIsWaving(true);
    timers.current.push(setTimeout(() => setShowAlternateName(true), name[0]));
    timers.current.push(setTimeout(() => setShowAlternateName(false), name[1]));
    timers.current.push(setTimeout(() => setIsWaving(false), ms));
    timers.current.push(setTimeout(() => (busy.current = false), ms + 300));
  }, []);
  useEffect(() => {
    const t = timers.current;
    // On data-saving phones the clip waits for a tap, so the name swaps on its own shortly after load. Everywhere
    // else the first wave waits until her clip has loaded (see onReady), so it is never skipped on a slow connection.
    if (!reduced && saveData()) t.push(setTimeout(wave, 1200));
    return () => t.forEach(clearTimeout);
  }, [reduced, wave]);
  const greeted = useRef(false);
  const onReady = useCallback(() => {
    if (reduced || greeted.current) return;
    greeted.current = true;
    timers.current.push(setTimeout(wave, 400));
  }, [reduced, wave]);

  return (
    <section className="relative flex-1 flex items-center pt-20 pb-8">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-10 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-block mb-6"
            >
              <span className="brutal-badge" style={{ background: "hsl(168 40% 60%)", color: "hsl(240 5% 10%)" }}>
                <span aria-hidden className="w-2 h-2 rounded-full bg-green-700 mr-2 animate-pulse" />
                Hello there! I'm
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-display font-bold mb-5 leading-[0.95]"
            >
              <span className="sr-only">Maureen Dzifa Quist</span>
              <span aria-hidden>
              <AnimatePresence mode="wait">
                {showAlternateName ? (
                  <motion.span
                    key="maureen"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary inline-block"
                  >
                    Maureen
                  </motion.span>
                ) : (
                  <motion.span
                    key="dzifa"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary inline-block"
                  >
                    Dzifa
                  </motion.span>
                )}
              </AnimatePresence>
              </span>
            </motion.h1>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[clamp(0.8rem,3.8vw,1.125rem)] sm:text-lg md:text-xl 2xl:text-2xl whitespace-nowrap text-foreground mb-6"
              style={{ textTransform: "none" }}
            >
              Business Intelligence Engineer | Building with AI
            </motion.p>


            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base md:text-lg 2xl:text-xl text-muted-foreground max-w-xl 2xl:max-w-2xl mx-auto lg:mx-0 mb-8"
              style={{ textTransform: 'none' }}
            >
              Thank you for taking the time to be here 😊
              <br />
              <br />
              I'm a data professional who loves turning data into insights that matter. Lately, I've been
              building AI-powered tools, from analytics pipelines to LLM agents, that help teams decide
              faster. I love it!
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button asChild size="lg" className="brutal-btn pop-hover bg-primary text-primary-foreground px-8 group">
                <Link to="/portfolio">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="brutal-btn pop-hover bg-card px-8">
                <Link to="/about">
                  About Me
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right side - Illustration */}
            {/* On phones and tablets she sits above the text; on laptops, beside it */}
            <div className="order-first lg:order-none">
              <HeroImage key={theme} clip={CLIPS[theme]} waving={isWaving} onWave={wave} onReady={onReady} />
            </div>
        </div>
      </div>
    </section>
  );
};
