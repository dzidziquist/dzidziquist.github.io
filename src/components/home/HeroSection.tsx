import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import waveRest from "@/assets/hero-wave-rest.png";
import waveVideo from "@/assets/hero-wave.mp4";
import { useMotion } from "@/hooks/use-motion";

// Wave clip (generated with Vidu): typing, she looks up, waves with the hand by the plant, and eases back to typing.
// It is an ordinary H.264 MP4, which every browser (Safari and iPad included) decodes reliably. Transparency is
// stored as a second, black-and-white picture under the first (white = solid), recombined on a canvas while it plays.
const WAVE = {
  rest: waveRest,
  video: waveVideo,
  size: 480,
  /** Clip length, and when the name shows "Maureen" during it (ms). */
  ms: 5040,
  name: [1800, 4300] as [number, number],
};

/** Reads a file into memory. Inlined copies (data: URLs) are decoded directly, because some hosts block fetch()
 * for them. */
const loadBlob = async (url: string): Promise<Blob> => {
  if (!url.startsWith("data:")) return (await fetch(url)).blob();
  const [head, body] = url.split(",", 2);
  const type = head.slice(5).split(";")[0];
  const bytes = head.endsWith(";base64") ? Uint8Array.from(atob(body), (c) => c.charCodeAt(0)) : new TextEncoder().encode(decodeURIComponent(body));
  return new Blob([bytes], { type });
};

/** Typing pose; on cue (load, hover, tap or Enter) she plays the waving clip once and settles back to typing. */
const HeroImage = ({ waving, onWave, onReady }: { waving: boolean; onWave: () => void; onReady: () => void }) => {
  const [hovered, setHovered] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [sources, setSources] = useState<string[]>([]);
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  // The clip is fetched only on screens that show her, once the page has loaded. A blob copy is tried first and
  // the original address second, since hosts differ in which of the two they allow for video.
  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    let cancelled = false;
    let url: string | undefined;
    const load = () =>
      loadBlob(WAVE.video)
        .then((b) => {
          url = URL.createObjectURL(b);
          if (!cancelled) setSources([url, WAVE.video]);
        })
        .catch(() => !cancelled && setSources([WAVE.video]));
    if (document.readyState === "complete") load();
    else window.addEventListener("load", load, { once: true });
    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
      window.removeEventListener("load", load);
    };
  }, []);

  useEffect(() => {
    if (ready) onReady();
  }, [ready, onReady]);

  // While the clip plays, draw each frame: colour from the top half, transparency from the bottom half.
  useEffect(() => {
    if (!playing) return;
    const v = video.current!;
    const out = canvas.current!.getContext("2d")!;
    const work = document.createElement("canvas");
    work.width = WAVE.size;
    work.height = WAVE.size * 2;
    const ctx = work.getContext("2d", { willReadFrequently: true })!;
    let stop = false;
    const draw = () => {
      if (stop) return;
      try {
        ctx.drawImage(v, 0, 0, WAVE.size, WAVE.size * 2);
        const color = ctx.getImageData(0, 0, WAVE.size, WAVE.size);
        const mask = ctx.getImageData(0, WAVE.size, WAVE.size, WAVE.size).data;
        const px = color.data;
        for (let i = 3; i < px.length; i += 4) px[i] = mask[i - 3];
        out.putImageData(color, 0, 0);
      } catch {
        stop = true;
        setPlaying(false);
        return;
      }
      if ("requestVideoFrameCallback" in v) v.requestVideoFrameCallback(draw);
      else requestAnimationFrame(draw);
    };
    draw();
    return () => {
      stop = true;
    };
  }, [playing]);

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
      className="hidden lg:flex items-center justify-center"
    >
      <motion.div
        className="relative w-full max-w-[460px] select-none aspect-square cursor-pointer rounded-3xl"
        role="button"
        tabIndex={0}
        aria-label="Wave hello"
        onMouseEnter={() => {
          setHovered(true);
          onWave();
        }}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        onClick={onWave}
        onKeyDown={(e) => {
          if (e.key !== "Enter" && e.key !== " ") return;
          e.preventDefault();
          onWave();
        }}
        animate={{ y: hovered ? -6 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        <img
          src={WAVE.rest}
          alt="Dzidzi, a 3D illustration of a girl with a curly afro coding on a laptop"
          draggable={false}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: playing ? 0 : 1 }}
        />
        <canvas
          ref={canvas}
          width={WAVE.size}
          height={WAVE.size}
          aria-hidden
          className="absolute inset-0 w-full h-full"
          style={{ opacity: playing ? 1 : 0 }}
        />
        {/* The source clip itself stays invisible; only the recombined canvas is shown. */}
        <video
          ref={video}
          src={sources[0]}
          aria-hidden
          muted
          playsInline
          preload="auto"
          className="absolute w-px h-px opacity-0 pointer-events-none"
          onLoadedData={() => setReady(true)}
          onError={() => setSources((s) => s.slice(1))}
          onPlaying={() => setPlaying(true)}
          onEnded={() => setPlaying(false)}
        />
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
  const busy = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const wave = useCallback(() => {
    if (busy.current) return;
    busy.current = true;
    setIsWaving(true);
    timers.current.push(setTimeout(() => setShowAlternateName(true), WAVE.name[0]));
    timers.current.push(setTimeout(() => setShowAlternateName(false), WAVE.name[1]));
    timers.current.push(setTimeout(() => setIsWaving(false), WAVE.ms));
    timers.current.push(setTimeout(() => (busy.current = false), WAVE.ms + 300));
  }, []);
  useEffect(() => {
    const t = timers.current;
    // Where she is hidden (narrow screens) only the name swaps, shortly after load. Where she shows, the first
    // wave waits until her clip has loaded (see onReady), so it is never skipped on a slow connection.
    if (!reduced && !window.matchMedia("(min-width: 1024px)").matches) t.push(setTimeout(wave, 1200));
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
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center">
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
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-5 leading-[0.95]"
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
              className="text-[clamp(0.8rem,3.8vw,1.125rem)] sm:text-lg md:text-xl whitespace-nowrap text-foreground mb-6"
              style={{ textTransform: "none" }}
            >
              Business Intelligence Engineer | Building with AI
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
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
            <HeroImage waving={isWaving} onWave={wave} onReady={onReady} />
        </div>
      </div>
    </section>
  );
};
