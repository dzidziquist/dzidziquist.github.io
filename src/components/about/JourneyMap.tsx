import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMotion } from "@/hooks/use-motion";
import { LocationTag } from "@/components/home/LocationTag";
import travelStickers from "@/assets/travel-stickers.webp";

/*
 * Her journey as a dotted flight path drawn out from the photo: Accra → Rome → Kabul → Los Angeles → Seattle.
 * Everything is laid out in the photo's own square (0–100 on both axes, overflowing below it), so the route
 * starts on the photo's border and lines up at every screen size.
 */
const ROUTE = "M15 86 C6 92 -8 94 -6 100 S2 114 8 116 S20 103 26 104 S36 118 42 116 S52 107 58 110";
const STOPS = [
  { x: -6, y: 100, label: "Accra", at: 0.25, side: "left" },
  { x: 8, y: 116, label: "Rome", at: 0.47, side: "below" },
  { x: 26, y: 104, label: "Kabul", at: 0.66, side: "above" },
  { x: 42, y: 116, label: "LA", at: 0.85, side: "below" },
] as const;
const START = 0.6; // seconds after load
const TRAVEL = 3; // seconds from the photo to Seattle
const INK = "hsl(240 5% 10%)";
// Each stop shows from when the route reaches it until just after the route reaches the next one, then fades,
// so only Seattle is left at the end.
// The route eases in and out, so convert "share of the way" into "share of the time" to land on each stop.
const bezier = (t: number) => 3 * (1 - t) * t * t + t * t * t; // y of ease-in-out with control points 0 and 1
const bezierX = (t: number) => 3 * (1 - t) * (1 - t) * t * 0.42 + 3 * (1 - t) * t * t * 0.58 + t * t * t;
const timeAt = (progress: number) => {
  let lo = 0, hi = 1;
  for (let k = 0; k < 30; k++) {
    const mid = (lo + hi) / 2;
    if (bezier(mid) < progress) lo = mid; else hi = mid;
  }
  return bezierX((lo + hi) / 2);
};
const visit = (i: number) => {
  const from = START + TRAVEL * timeAt(STOPS[i].at);
  const to = START + TRAVEL * (i + 1 < STOPS.length ? timeAt(STOPS[i + 1].at) : 1);
  const duration = to - from + 0.5;
  return { delay: from, duration, times: [0, 0.12, 0.7, 1] };
};

export const JourneyMap = ({ onStickers }: { onStickers?: (open: boolean) => void }) => {
  const { reduced } = useMotion();
  const plane = useRef<SVGAnimateMotionElement>(null);
  const traveller = useRef<SVGCircleElement>(null);
  const [flying, setFlying] = useState(false);
  // Hovering (or tapping) Seattle shows her travel stickers from every stop; the sheet loads on first use.
  const [open, setOpen] = useState(false);
  const [wanted, setWanted] = useState(false);
  const show = (v: boolean) => {
    if (v) setWanted(true);
    setOpen(v);
  };
  useEffect(() => onStickers?.(open), [open, onStickers]);
  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !(e.target as Element).closest("[data-seattle]")) setOpen(false);
    };
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  // A small dot rides the route while it draws, then disappears under the Seattle sticker.
  useEffect(() => {
    if (reduced) return;
    const go = setTimeout(() => setFlying(true), START * 1000);
    const land = setTimeout(() => setFlying(false), (START + TRAVEL) * 1000);
    return () => [go, land].forEach(clearTimeout);
  }, [reduced]);
  useEffect(() => {
    if (!flying) return;
    plane.current?.beginElement();
    if (traveller.current) traveller.current.style.visibility = "visible";
  }, [flying]);

  return (
    <div className={`pointer-events-none absolute inset-0 ${open ? "z-40" : "z-20"}`}>
      <span className="sr-only">Her journey: Accra, Ghana to Rome, Italy to Kabul, Afghanistan to Los Angeles to Seattle, where she is now based.</span>
      <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          {/* The route is revealed through this mask as it draws, so the dashes stay crisp instead of stretching */}
          <mask id="route-reveal" maskUnits="userSpaceOnUse" x="-30" y="0" width="160" height="160">
            <motion.path
              d={ROUTE}
              fill="none"
              stroke="#fff"
              strokeWidth={6}
              initial={reduced ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: TRAVEL, delay: START, ease: "easeInOut" }}
            />
          </mask>
        </defs>
        <path
          d={ROUTE}
          fill="none"
          stroke={INK}
          strokeWidth={1.6}
          strokeDasharray="2 5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          mask="url(#route-reveal)"
        />
        {/* Take-off point on the photo's border */}
        <circle cx="15" cy="86" r="1.5" fill={INK} />
        {flying && (
          <circle ref={traveller} r="2" fill={INK} style={{ visibility: "hidden" }}>
            <animateMotion ref={plane} dur={`${TRAVEL}s`} begin="indefinite" fill="freeze" path={ROUTE} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.42 0 0.58 1" />
          </circle>
        )}
        {!reduced && STOPS.map((s, i) => (
          <motion.circle
            key={s.label}
            cx={s.x}
            cy={s.y}
            r="1.7"
            fill="hsl(var(--pair))"
            stroke={INK}
            strokeWidth="0.8"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.15, 1, 0] }}
            transition={visit(i)}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}
      </svg>
      {!reduced && STOPS.map((s, i) => (
        <span
          key={s.label}
          aria-hidden
          className={`absolute ${s.side === "left" ? "-translate-x-full -translate-y-1/2" : "-translate-x-1/2"}`}
          style={{
            left: `${s.side === "left" ? s.x - 3.5 : s.x}%`,
            top: `${s.side === "left" ? s.y : s.side === "below" ? s.y + 3 : s.y - 8}%`,
          }}
        >
          <motion.span
            className="block font-mono text-[10px] sm:text-[11px] xl:text-xs font-bold uppercase tracking-wider whitespace-nowrap"
            style={{ color: INK }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: [0, 1, 1, 0], y: [4, 0, 0, -4] }}
            transition={visit(i)}
          >
            {s.label}
          </motion.span>
        </span>
      ))}
      {/* Her travel stickers, one for each stop: while Seattle is hovered or tapped, they take the photo's place */}
      <AnimatePresence>
        {open && (
          <motion.img
            src={travelStickers}
            alt="Travel stickers of Dzidzi in Accra, Rome, Kabul, Los Angeles and Seattle"
            draggable={false}
            className="absolute left-1/2 top-1/2 z-30 w-[118%] max-w-none select-none drop-shadow-[3px_4px_0_rgba(0,0,0,0.3)]"
            style={{ x: "-50%", y: "-50%", transformOrigin: "65% 95%" }}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
            transition={{ duration: reduced ? 0.2 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>
      {/* Preload the sheet once wanted, so a second hover shows it instantly */}
      {wanted && !open && <link rel="preload" as="image" href={travelStickers} />}
      {/* Destination: the Seattle sticker lands at the end of the route, then decodes its coordinates */}
      <motion.div
        data-seattle
        role="button"
        tabIndex={0}
        aria-label="Show my travel stickers"
        aria-expanded={open}
        // Mouse: show while hovering. Touch: tap to toggle (tapping anywhere else closes). Keyboard: Enter or Space.
        onPointerEnter={(e) => e.pointerType === "mouse" && show(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && show(false)}
        onPointerUp={(e) => e.pointerType !== "mouse" && show(!open)}
        onBlur={() => show(false)}
        onKeyDown={(e) => {
          if (e.key !== "Enter" && e.key !== " ") return;
          e.preventDefault();
          show(!open);
        }}
        className="pointer-events-auto cursor-pointer absolute z-40 left-[57%] top-[110%] -translate-y-1/2 rounded-full border-2 border-foreground px-2.5 py-0.5 lg:px-3 lg:py-1 font-mono text-xs sm:text-sm xl:text-base whitespace-nowrap"
        style={{ background: "hsl(var(--pair))", color: INK, boxShadow: "2px 2px 0 hsl(var(--foreground))" }}
        initial={reduced ? false : { scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 16, delay: START + TRAVEL - 0.1 }}
      >
        <LocationTag variant="sticker" delay={(START + TRAVEL) * 1000} />
      </motion.div>
    </div>
  );
};
