import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gaming from "@/assets/hobbies/gaming.webp";
import music from "@/assets/hobbies/music.webp";
import roadtrip from "@/assets/hobbies/roadtrip.webp";
import vinyl from "@/assets/hobbies/vinyl.webp";
import plants from "@/assets/hobbies/plants.webp";
import lego from "@/assets/hobbies/lego.webp";
import tiramisu from "@/assets/hobbies/tiramisu.webp";
import sunflowers from "@/assets/hobbies/sunflowers.webp";
import sneakers from "@/assets/hobbies/sneakers.webp";

type Segment = string | { img: string; text: string };

const SEGMENTS: Segment[] = [
  "My hobbies include playing ",
  { img: gaming, text: "adventure video games" },
  ", ",
  { img: music, text: "listening to music" },
  ", and going on ",
  { img: roadtrip, text: "road trips" },
  ". I've recently gotten into ",
  { img: vinyl, text: "collecting vinyl records" },
  ", too. I'm a ",
  { img: plants, text: "plant mom" },
  " who also loves ",
  { img: sunflowers, text: "sunflowers" },
  " 🌻, building my houseplant collection and growing my own peppers, tomatoes, and spring onions (my latest hobby!). I'm crazy about ",
  { img: sneakers, text: "Air Force 1s, Jordans" },
  ", and ",
  { img: lego, text: "Legos" },
  ", and I have a major sweet tooth for candy, ",
  { img: tiramisu, text: "tiramisu" },
  ", and boba tea 🙈",
];

const IMG = 120; // px height of the hobby image
const SPRING = { type: "spring", stiffness: 420, damping: 32 } as const;
const wordClass = "font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-2 cursor-pointer";

/**
 * Hover, tap or keyboard opens a hobby's picture (WCAG 1.4.13): it stays open while the pointer is over the
 * word or the picture, and Escape closes it.
 */
const useHover = () => {
  const [active, setActive] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const open = (i: number) => {
    clearTimeout(closeTimer.current);
    setActive(i);
  };
  const close = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActive(null), 150);
  };

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const bind = (i: number) => ({
    role: "button",
    tabIndex: 0,
    "aria-expanded": active === i,
    onPointerEnter: (e: React.PointerEvent) => e.pointerType === "mouse" && open(i),
    onPointerLeave: (e: React.PointerEvent) => e.pointerType === "mouse" && close(),
    onPointerDown: (e: React.PointerEvent) => e.pointerType !== "mouse" && setActive((a) => (a === i ? null : i)),
    onFocus: () => open(i),
    onBlur: close,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      setActive((a) => (a === i ? null : i));
    },
  });
  /** Props for the picture, so moving the pointer onto it keeps it open. */
  const keep = (i: number) => ({
    onPointerEnter: (e: React.PointerEvent) => e.pointerType === "mouse" && open(i),
    onPointerLeave: (e: React.PointerEvent) => e.pointerType === "mouse" && close(),
  });
  return { active, bind, keep };
};

/* 1. Words slide apart: the image opens inline right after the word, pushing the text aside. */
const SlideApart = () => {
  const { active, bind } = useHover();
  return (
    <p className="text-xs text-muted-foreground leading-relaxed" style={{ textTransform: "none" }}>
      {SEGMENTS.map((seg, i) =>
        typeof seg === "string" ? (
          <span key={i}>{seg}</span>
        ) : (
          <span key={i} {...bind(i)}>
            <span className={wordClass}>{seg.text}</span>
            <AnimatePresence>
              {active === i && (
                <motion.span
                  className="inline-block align-middle overflow-hidden"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: IMG + 16, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={SPRING}
                >
                  <img src={seg.img} alt="" className="block mx-2 object-contain" style={{ height: IMG, width: IMG }} />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        ),
      )}
    </p>
  );
};

/* 2. Opens below: lines under the hovered word glide down and the image sits in the gap. */
// Split plain text into words so each line can move independently.
const PARTS: { text: string; hobby?: number }[] = [];
SEGMENTS.forEach((seg, i) => {
  if (typeof seg === "string") seg.split(/(?<= )/).forEach((w) => PARTS.push({ text: w }));
  else PARTS.push({ text: seg.text, hobby: i });
});

const OpenBelow = () => {
  const { active, bind, keep } = useHover();
  const wrap = useRef<HTMLDivElement>(null);
  const tokens = useRef<(HTMLSpanElement | null)[]>([]);
  const [layout, setLayout] = useState<{ top: number; left: number; moved: Set<number> } | null>(null);
  const GAP = IMG + 12;

  useLayoutEffect(() => {
    if (active === null || !wrap.current) return setLayout(null);
    const box = wrap.current.getBoundingClientRect();
    const word = tokens.current[PARTS.findIndex((p) => p.hobby === active)]!.getBoundingClientRect();
    const lineBottom = word.bottom - box.top;
    const moved = new Set<number>();
    tokens.current.forEach((el, k) => {
      if (el && el.getBoundingClientRect().top - box.top > lineBottom - 4) moved.add(k);
    });
    const left = Math.min(Math.max(word.left - box.left + word.width / 2 - IMG / 2, 0), box.width - IMG);
    setLayout({ top: lineBottom + 4, left, moved });
  }, [active]);

  return (
    <motion.div ref={wrap} className="relative" animate={{ paddingBottom: layout ? GAP : 0 }} transition={SPRING}>
      <p className="text-xs text-muted-foreground leading-relaxed" style={{ textTransform: "none" }}>
        {PARTS.map((p, k) => (
          <motion.span
            key={k}
            ref={(el) => (tokens.current[k] = el)}
            className={`inline-block whitespace-pre ${p.hobby !== undefined ? wordClass : ""}`}
            animate={{ y: layout?.moved.has(k) ? GAP : 0 }}
            transition={SPRING}
            {...(p.hobby !== undefined ? bind(p.hobby) : {})}
          >
            {p.text}
          </motion.span>
        ))}
      </p>
      <AnimatePresence>
        {layout && active !== null && (
          <motion.img
            key={active}
            src={(SEGMENTS[active] as { img: string }).img}
            alt={`Illustration: ${(SEGMENTS[active] as { text: string }).text}`}
            className="absolute object-contain"
            style={{ top: layout.top, left: layout.left, height: IMG, width: IMG }}
            {...keep(active)}
            initial={{ opacity: 0, scale: 0.6, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={SPRING}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* 3. Letters scatter: letters near the cursor bounce away; the image floats above the hobby. */
const Scatter = () => {
  const { active, bind } = useHover();
  const wrap = useRef<HTMLDivElement>(null);
  const letters = useRef<(HTMLSpanElement | null)[]>([]);
  const centres = useRef<{ x: number; y: number }[]>([]);
  const [offsets, setOffsets] = useState<Record<number, { x: number; y: number }>>({});
  const [imgPos, setImgPos] = useState<{ top: number; left: number } | null>(null);
  const words = useRef<(HTMLSpanElement | null)[]>([]);

  const measure = () => {
    centres.current = letters.current.map((el) => {
      const r = el!.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
  };
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const next: Record<number, { x: number; y: number }> = {};
    centres.current.forEach((c, i) => {
      const dx = c.x - e.clientX, dy = c.y - e.clientY, d = Math.hypot(dx, dy);
      if (d < 70 && d > 0) {
        const f = ((70 - d) / 70) * 14;
        next[i] = { x: (dx / d) * f, y: (dy / d) * f };
      }
    });
    setOffsets(next);
  };

  useLayoutEffect(() => {
    if (active === null || !wrap.current) return setImgPos(null);
    const box = wrap.current.getBoundingClientRect();
    const w = words.current[active]!.getBoundingClientRect();
    setImgPos({ top: w.top - box.top - IMG - 8, left: Math.min(Math.max(w.left - box.left + w.width / 2 - IMG / 2, 0), box.width - IMG) });
  }, [active]);

  let n = 0;
  // Letters are grouped per word so lines still break between words.
  const renderLetters = (text: string, hobby = false) =>
    text.split(/(?<= )/).map((word, wi) => (
      <span key={wi} className="inline-block whitespace-pre">
        {[...word].map((ch) => {
          const i = n++;
          const o = offsets[i];
          return (
            <motion.span
              key={i}
              ref={(el) => (letters.current[i] = el)}
              className={`inline-block whitespace-pre ${hobby && ch !== " " ? "border-b-2 border-primary" : ""}`}
              animate={{ x: o?.x ?? 0, y: o?.y ?? 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 14 }}
            >
              {ch}
            </motion.span>
          );
        })}
      </span>
    ));

  return (
    <div ref={wrap} className="relative" onPointerEnter={measure} onPointerMove={onMove} onPointerLeave={() => setOffsets({})}>
      <p className="text-xs text-muted-foreground leading-relaxed" style={{ textTransform: "none" }}>
        {SEGMENTS.map((seg, i) =>
          typeof seg === "string" ? (
            <span key={i}>{renderLetters(seg)}</span>
          ) : (
            <span key={i} ref={(el) => (words.current[i] = el)} className="font-semibold text-foreground cursor-pointer" {...bind(i)}>
              {renderLetters(seg.text, true)}
            </span>
          ),
        )}
      </p>
      <AnimatePresence>
        {imgPos && active !== null && (
          <motion.img
            key={active}
            src={(SEGMENTS[active] as { img: string }).img}
            alt=""
            className="absolute object-contain pointer-events-none z-30"
            style={{ top: imgPos.top, left: imgPos.left, height: IMG, width: IMG }}
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={SPRING}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

/** Preview switch: /about?v=1, ?v=2 or ?v=3. */
export const HobbyParagraph = () => {
  const v = new URLSearchParams(window.location.search || window.location.hash.split("?")[1] || "").get("v") ?? "2";
  if (v === "1") return <SlideApart />;
  if (v === "3") return <Scatter />;
  return <OpenBelow />;
};
