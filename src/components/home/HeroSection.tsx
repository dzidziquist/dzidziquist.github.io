import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import dzidziIllustration from "@/assets/dzidzi-illustration.png";
import { useRandomColor } from "@/hooks/use-random-color";
import { useTheme } from "@/hooks/use-theme";

const CODE_SIGNS = ["</>", "{}", "[ ]", "=>", "<div>", "<?>"];

const COLS = 7;
const ROWS = 4;

type SignItem = {
  id: number; sign: string; top: string; left: string;
  size: number; opacity: number; duration: number;
  delay: number; repeatDelay: number; rotate: number; depth: number;
};

const CodeSign = ({
  item, mouseX, mouseY, opacityScale,
}: {
  item: SignItem;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  opacityScale: number;
}) => {
  const x = useTransform(mouseX, (v) => v * item.depth);
  const y = useTransform(mouseY, (v) => v * item.depth);

  return (
    <motion.div className="absolute" style={{ top: item.top, left: item.left, x, y }}>
      <motion.span
        className="block select-none font-mono font-bold text-foreground"
        style={{ fontSize: item.size, rotate: item.rotate }}
        animate={{
          opacity: [0, item.opacity * opacityScale, item.opacity * opacityScale, 0],
          y: [0, -6, -10, -6],
        }}
        transition={{
          duration: item.duration,
          delay: item.delay,
          repeat: Infinity,
          repeatDelay: item.repeatDelay,
          ease: "easeInOut",
          times: [0, 0.2, 0.8, 1],
        }}
      >
        {item.sign}
      </motion.span>
    </motion.div>
  );
};

const CodeBackground = () => {
  const { theme } = useTheme();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 40, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 30);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 30);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rawX, rawY]);

  const items = useMemo<SignItem[]>(() => {
    return Array.from({ length: COLS * ROWS }, (_, i) => {
      const seed = i * 7919;
      const rand = (n: number) => ((seed * (n + 1) * 2654435761) >>> 0) / 0xffffffff;
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const cellW = 96 / COLS;
      const cellH = 92 / ROWS;
      return {
        id: i,
        sign: CODE_SIGNS[i % CODE_SIGNS.length],
        top: `${row * cellH + cellH * 0.2 + rand(1) * cellH * 0.6}%`,
        left: `${col * cellW + cellW * 0.1 + rand(2) * cellW * 0.8}%`,
        size: 10 + rand(3) * 10,
        opacity: 0.04 + rand(4) * 0.05,
        duration: 2.5 + rand(5) * 2.5,
        delay: rand(6) * 3,
        repeatDelay: 1 + rand(7) * 1.5,
        rotate: rand(8) * 30 - 15,
        depth: 0.3 + rand(9) * 1.2,
      };
    });
  }, []);

  const opacityScale = theme === "light" ? 1.5 : 1;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {items.map((item) => (
        <CodeSign key={item.id} item={item} mouseX={springX} mouseY={springY} opacityScale={opacityScale} />
      ))}
    </div>
  );
};

const HeroImage = () => {
  const color = useRandomColor();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="hidden lg:flex items-center justify-center"
    >
      <div
        className="relative w-full max-w-lg border border-foreground bg-card p-4 transition-all duration-300"
        style={{
          boxShadow: hovered ? `6px 6px 0px ${color.accent}` : 'var(--brutal-shadow-lg)',
          borderColor: hovered ? color.accent : undefined,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={dzidziIllustration}
          alt="Dzidzi working at laptop with cat"
          className="w-full h-auto object-contain"
        />
      </div>
    </motion.div>
  );
};

export const HeroSection = () => {
  const [showAlternateName, setShowAlternateName] = useState(false);
  const [isWaving, setIsWaving] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => {
        setShowAlternateName(true);
      }, 300);
      setTimeout(() => {
        setIsWaving(false);
        setShowAlternateName(false);
      }, 2000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden pt-20">
      <CodeBackground />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-block mb-6"
            >
              <span className="brutal-badge bg-mint text-foreground">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                Hello there! I'm
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 leading-[0.95]"
            >
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
              </AnimatePresence>{" "}
              <motion.span
                className="inline-block cursor-pointer select-none"
                whileHover={{ scale: 1.1 }}
                animate={isWaving ? { rotate: [0, 20, -10, 20, -10, 20, 0] } : {}}
                transition={{ duration: 1 }}
              >
                👋🏾
              </motion.span>
            </motion.h1>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl font-bold text-foreground mb-6 uppercase tracking-wide"
            >
              Business Intelligence Engineer &<br className="hidden sm:block" /> Data Visualization Professional
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
              style={{ textTransform: 'none' }}
            >
              Thank you for taking the time to be here 😊. I'm a data professional on an exciting 
              journey of exploring data, continuously learning, and visualizing insights in meaningful ways.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button asChild size="lg" className="brutal-btn bg-primary text-primary-foreground px-8 group">
                <Link to="/portfolio">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="brutal-btn bg-card px-8">
                <Link to="/about">
                  About Me
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right side - Illustration */}
            <HeroImage />
        </div>
      </div>

      {/* Copyright Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute bottom-6 left-0 right-0 text-center"
      >
        <p className="mono-label text-muted-foreground">
          Copyright © 2026 Dzidzi Quist. Made with 💜.
        </p>
      </motion.div>
    </section>
  );
};
