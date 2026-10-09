import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import waveRest from "@/assets/hero-wave-rest.webp";
import waveSprite from "@/assets/hero-wave-sprite.webp";
import waveVideo from "@/assets/hero-wave.webm";
import { useMotion } from "@/hooks/use-motion";

interface Wave {
  rest: string;
  /** Sprite sheet, 8 frames wide: the fallback where the video cannot play (Safari). */
  sprite: string;
  frames: number;
  rows: number;
  fps: number;
  /** Transparent VP9 video: plays smoothly at its full frame rate where supported. */
  video?: string;
  /** Clip length, and when the name shows "Maureen" during it (ms). */
  ms: number;
  name: [number, number];
}

// Wave clip (generated with Kling): typing, she looks up, waves with the hand by the plant, and returns to typing.
const WAVE: Wave = {
  rest: waveRest,
  sprite: waveSprite,
  frames: 60,
  rows: 8,
  fps: 12,
  video: waveVideo,
  ms: 4960,
  name: [2200, 4500],
};
const COLS = 8;

// Safari cannot show transparent VP9 video, so it uses the sprite sheet instead.
const isSafari = /^((?!chrome|android|crios|fxios|edg).)*safari/i.test(navigator.userAgent);
const USE_VIDEO =
  !!WAVE.video && !isSafari && document.createElement("video").canPlayType('video/webm; codecs="vp9"') !== "";

/** Typing pose; on cue (load, hover, tap or Enter) she plays the waving clip once and settles back to typing. */
const HeroImage = ({ waving, onWave }: { waving: boolean; onWave: () => void }) => {
  const [hovered, setHovered] = useState(false);
  const [frame, setFrame] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>();
  const video = useRef<HTMLVideoElement>(null);

  // The wave is large, so fetch it only on screens that show her, once the page has loaded.
  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    let cancelled = false;
    const load = () => {
      if (USE_VIDEO) return setVideoSrc(WAVE.video);
      const img = new Image();
      img.src = WAVE.sprite;
      img.decode().then(() => !cancelled && setReady(true)).catch(() => {});
    };
    if (document.readyState === "complete") load();
    else window.addEventListener("load", load, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", load);
    };
  }, []);

  // Play the whole clip each time a wave starts; it always finishes back on the typing pose.
  const timer = useRef<ReturnType<typeof setInterval>>();
  useEffect(() => {
    if (!waving || !ready) return;
    if (USE_VIDEO) {
      const v = video.current!;
      v.currentTime = 0;
      v.play().catch(() => setPlaying(false));
      return;
    }
    clearInterval(timer.current);
    let f = 0;
    setFrame(0);
    timer.current = setInterval(() => {
      f += 1;
      if (f >= WAVE.frames) { clearInterval(timer.current); setFrame(null); return; }
      setFrame(f);
    }, 1000 / WAVE.fps);
  }, [waving, ready]);
  useEffect(() => () => clearInterval(timer.current), []);

  const col = (frame ?? 0) % COLS;
  const row = Math.floor((frame ?? 0) / COLS);
  const animating = USE_VIDEO ? playing : frame !== null;

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
          style={{ opacity: animating ? 0 : 1 }}
        />
        {USE_VIDEO ? (
          <video
            ref={video}
            src={videoSrc}
            aria-hidden
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full"
            style={{ opacity: playing ? 1 : 0 }}
            onCanPlayThrough={() => setReady(true)}
            onPlaying={() => setPlaying(true)}
            onEnded={() => setPlaying(false)}
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              opacity: frame === null ? 0 : 1,
              backgroundImage: ready ? `url(${WAVE.sprite})` : undefined,
              backgroundSize: `${COLS * 100}% ${WAVE.rows * 100}%`,
              backgroundPosition: `${(col / (COLS - 1)) * 100}% ${(row / (WAVE.rows - 1)) * 100}%`,
            }}
          />
        )}
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
    if (!reduced) t.push(setTimeout(wave, 1200));
    return () => t.forEach(clearTimeout);
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
            <HeroImage waving={isWaving} onWave={wave} />
        </div>
      </div>
    </section>
  );
};
