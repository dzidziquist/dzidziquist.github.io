import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, type Variants } from "framer-motion";
import { ArrowUpRight, Circle, Images, BarChart3, Blocks, BrainCircuit, Compass, Sparkles, type LucideIcon } from "lucide-react";
import { useMotion } from "@/hooks/use-motion";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import thyveImg from "@/assets/portfolio/thyve-app.webp";
import salesOverviewImg from "@/assets/portfolio/sales-overview.webp";
import inukkiImg from "@/assets/portfolio/inukki-app.webp";
import bitemapImg from "@/assets/portfolio/bitemap-app.webp";
import eathereImg from "@/assets/portfolio/eathere-app.webp";
import horaceImg from "@/assets/portfolio/horace-site.webp";

/**
 * App screens for the viewer, named <app>-NN.webp in src/assets/portfolio/journey and shown in that order.
 * Drop in a new file with the next number and it appears; nothing else to change.
 */
const SCREEN_FILES = import.meta.glob("/src/assets/portfolio/journey/*.webp", { eager: true, import: "default" }) as Record<string, string>;
const screensFor = (app: string) =>
  Object.keys(SCREEN_FILES)
    .filter((file) => file.includes(`/${app}-`))
    .sort()
    .map((file) => SCREEN_FILES[file]);
const plantfamScreens = screensFor("plantfam");
const cuerecordScreens = screensFor("cuerecord");
const reelfeelScreens = screensFor("reelfeel");

/*
 * My Journey: five chapters on a timeline. Each chapter pairs the story with evidence
 * (a dashboard, an experiment, projects, decisions, a roadmap). On desktop the evidence
 * sits in a sticky panel that follows the chapter you're reading; on smaller screens it
 * sits inside each chapter. Text in [square brackets] is a placeholder waiting for real content.
 */

/** A soft "ease out" used by every entrance on this page. */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HEADLINE = ["From", "data", "to", "building", "with"];

const Intro = () => {
  const { reduced } = useMotion();
  const rise = (n: number) =>
    reduced ? {} : { initial: { opacity: 0, y: "0.4em" }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.08 * n, ease: EASE } };
  return (
    <div className="mb-12 lg:mb-16 max-w-3xl">
      <motion.p {...rise(0)} className="mono-label text-primary mb-3">My journey · 5 chapters</motion.p>
      <h1 id="journey-title" className="font-display font-bold text-4xl md:text-5xl 2xl:text-6xl leading-[0.95] mb-5 text-balance">
        {HEADLINE.map((w, n) => (
          <motion.span key={w} {...rise(n + 1)} className="inline-block mr-[0.25em]">
            {w}
          </motion.span>
        ))}
        <motion.span {...rise(HEADLINE.length + 1)} className="relative inline-block">
          AI
          <motion.span
            aria-hidden
            initial={reduced ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
            className="absolute left-0 right-0 -bottom-1 h-[0.14em] rounded-full bg-primary origin-left"
          />
        </motion.span>
      </h1>
      <motion.p {...rise(HEADLINE.length + 2)} className="text-muted-foreground text-base md:text-lg max-w-xl text-pretty" style={{ textTransform: "none" }}>
        How a business intelligence engineer found AI, learned to build with it, and is growing into an AI product manager.
      </motion.p>
    </div>
  );
};


const Status = ({ kind, children }: { kind: "live" | "build" | "todo"; children: string }) => (
  <span
    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
      kind === "live" ? "border-foreground bg-primary text-primary-foreground" : kind === "build" ? "border-foreground bg-card text-foreground" : "border-dashed border-foreground/50 text-muted-foreground"
    }`}
  >
    {children}
  </span>
);

interface EvidenceChapter {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  body: string;
  note?: string;
  takeaway: string;
  evidence: "dashboard" | "experiment" | "projects" | "learning" | "roadmap";
  link?: { label: string; to: string };
}

const EVIDENCE_CHAPTERS: EvidenceChapter[] = [
  {
    icon: BarChart3,
    title: "Where I started",
    subtitle: "BIE: my foundation",
    body: "Data, business, operations, problem-solving, and understanding how organizations work.",
    note: "Fintech start-ups in Accra, the World Food Programme in Kabul, and now Prime Video, where I build large-scale data pipelines and dashboards.",
    takeaway: "The foundation: learning to understand problems before trying to solve them.",
    evidence: "dashboard",
    link: { label: "My experience", to: "/resume" },
  },
  {
    icon: Sparkles,
    title: "The discovery",
    subtitle: "Finding AI as a builder",
    body: "Realizing that AI coding tools could help turn ideas into things I previously couldn't build on my own.",
    takeaway: "The turning point: moving from imagining possibilities to making them real.",
    evidence: "experiment",
  },
  {
    icon: Blocks,
    title: "Learning by building",
    subtitle: "From prompting to understanding",
    body: "Building dzidziquist.com, developing PlantFam, experimenting with agents, and learning how to direct, debug, test, and improve AI-generated work.",
    takeaway: "The growth: becoming more deliberate, technically capable, and independent.",
    evidence: "projects",
    link: { label: "View my portfolio", to: "/portfolio" },
  },
  {
    icon: BrainCircuit,
    title: "Learning the craft",
    subtitle: "Beyond the first working version",
    body: "Understanding architecture, product decisions, evaluation, reliability, user needs, and when AI is or isn't the right solution.",
    takeaway: "The transformation: moving from building with AI to building AI-powered products thoughtfully.",
    evidence: "learning",
  },
  {
    icon: Compass,
    title: "Becoming an AI Product Manager",
    subtitle: "Where the journey leads",
    body: "Bringing business understanding, product thinking, AI fluency, and hands-on building together to create products that solve meaningful problems.",
    takeaway: "The destination: not just knowing what AI can do, but knowing what is worth building and why.",
    evidence: "roadmap",
    link: { label: "Get in touch", to: "/about" },
  },
];

/**
 * `kind: "todo"` draws a card as a dashed placeholder. `gallery` opens the app's screens in a viewer (which
 * also links to `to`, the case study, when there is one); otherwise `to` links within this site and `href`
 * to a live site elsewhere.
 */
interface Project {
  name: string;
  status: string;
  kind: "live" | "build" | "todo";
  line: string;
  to?: string;
  href?: string;
  img?: string;
  gallery?: string[];
}

const PROJECTS: Project[] = [
  { name: "dzidziquist.com", status: "Live", kind: "live", line: "This site. First WordPress with Divi, now redesigned with Claude.", to: "/" },
  { name: "ReelFeel", status: "On TestFlight", kind: "build", line: "Built for a friend: a film and TV diary of how each watch made them feel.", to: "/portfolio/reelfeel", img: reelfeelScreens[0], gallery: reelfeelScreens },
  { name: "Thyve", status: "In development", kind: "build", line: "Built for me, to manage my thyroid on PTU.", to: "/portfolio/thyve", img: thyveImg },
  { name: "PlantFam", status: "On TestFlight", kind: "build", line: "Built for my windowsill of tomatoes, peppers and spring onions.", img: plantfamScreens[0], gallery: plantfamScreens },
  { name: "CueRecord", status: "On TestFlight", kind: "build", line: "Built for a friend with 200+ vinyls. I use it too, since I started collecting.", img: cuerecordScreens[1], gallery: cuerecordScreens },
  { name: "Bite Map", status: "In development", kind: "build", line: "For the days I don't know what to eat. It began as Plates & Places.", img: bitemapImg },
  { name: "EatHere Invite", status: "Live", kind: "live", href: "https://celebratory-dinner.vercel.app", line: "A dinner invite to celebrate someone. They pick the vibe, Claude picks where.", img: eathereImg },
  { name: "Horace", status: "Live", kind: "live", href: "https://ejasare.com", line: "A friend saw my website and asked me to build him one. This is it.", img: horaceImg },
];

/** Real decisions from my own projects. `where` says which project it comes from. */
const LEARNING: { kind: string; text: string; where?: string }[] = [
  { kind: "Privacy", text: "No servers or accounts. Records stay on the phone, and only the context you switch on goes to the AI.", where: "Thyve" },
  { kind: "Security", text: "Row Level Security, so a user can only ever read and write their own rows.", where: "ReelFeel" },
  { kind: "Trade-off", text: "The website markets the app and does nothing else. The product is the phone.", where: "ReelFeel" },
  { kind: "AI design", text: "Labs, medication and cycle phase are sent as context, so you never re-explain yourself before a question.", where: "Thyve" },
  { kind: "Agents", text: "A planner, coder, tester and reviewer loop. The reviewer has no editing tools, so it can't fix its own way to an approval.", where: "Bite Map" },
  { kind: "Testing", text: "Checked every page of the live site for broken pages and links before calling it done.", where: "This site" },
  { kind: "When not to use AI", text: "Watering advice comes from a simple formula and safety rules, so it's predictable: a wilting plant gets \"check the soil first\", never \"water now\".", where: "PlantFam" },
];

const ROADMAP = [
  { done: true, text: "Built a RAG knowledge assistant on AWS Bedrock with agent orchestration, at work" },
  { done: true, text: "Moved this site off WordPress and redesigned it with Claude" },
  { done: true, text: "Shipped ReelFeel, CueRecord and PlantFam to TestFlight" },
  { done: true, text: "Took PlantFam from research report and product brief to a built app" },
  { done: false, text: "CueRecord in the App Store" },
  { done: false, text: "My first AI Product Manager role" },
];

const LIST: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } };
const ITEM: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

/** A tick that draws itself in. */
const DrawCheck = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-primary mt-0.5" role="img" aria-label="Done">
    <motion.path
      d="M5 12.5l4.5 4.5L19 7.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.5, delay: 0.25 } } }}
    />
  </svg>
);

/** Evidence that cascades in: on the desktop panel each time the chapter changes, inline when scrolled into view. */
const EvidencePanel = ({ kind, inline = false }: { kind: EvidenceChapter["evidence"]; inline?: boolean }) => {
  const { reduced } = useMotion();
  return (
    <motion.div
      variants={LIST}
      initial={reduced ? false : "hidden"}
      {...(inline ? { whileInView: "show", viewport: { once: true, margin: "-60px" } } : { animate: "show" })}
    >
      <EvidenceBody kind={kind} />
    </motion.div>
  );
};

/** The screens strip inside the viewer: swipe or scroll between them, or use the dots. */
const ScreenStrip = ({ name, shots }: { name: string; shots: string[] }) => {
  const { reduced } = useMotion();
  const strip = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);
  const items = () => Array.from(strip.current?.children ?? []) as HTMLElement[];
  // The screen whose centre is nearest the strip's centre is the one being shown.
  const onScroll = () => {
    const el = strip.current;
    if (!el) return;
    const all = items();
    // At either end of the strip, the end screen is the one being shown, even if it can't reach the centre.
    if (el.scrollLeft <= 2) return setCurrent(0);
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) return setCurrent(all.length - 1);
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    all.forEach((li, n) => {
      if (Math.abs(li.offsetLeft + li.offsetWidth / 2 - mid) < Math.abs(all[best].offsetLeft + all[best].offsetWidth / 2 - mid)) best = n;
    });
    setCurrent(best);
  };
  const go = (n: number) => {
    setCurrent(n);
    items()[n]?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", inline: "center", block: "nearest" });
  };
  return (
    <div>
      <ul
        ref={strip}
        onScroll={onScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-1 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label={`${name} screens`}
      >
        {shots.map((src, n) => (
          <li key={src} className="snap-center shrink-0">
            <img
              src={src}
              alt={`${name}, screen ${n + 1} of ${shots.length}`}
              loading="lazy"
              className="h-[min(62vh,560px)] w-auto rounded-[1.6rem] border-[3px] border-foreground bg-black"
            />
          </li>
        ))}
      </ul>
      {shots.length > 1 && (
        <div className="mt-4 flex justify-center gap-2" role="group" aria-label="Choose a screen">
          {shots.map((src, n) => (
            <button
              key={src}
              type="button"
              onClick={() => go(n)}
              aria-label={`Screen ${n + 1} of ${shots.length}`}
              aria-current={n === current}
              className={`h-2.5 rounded-full border border-foreground transition-all ${n === current ? "w-8 bg-primary" : "w-2.5 bg-transparent hover:bg-foreground/30"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/** A card that opens the app's screens in a viewer, for apps with nowhere public to link to. */
const ScreensCard = ({ project, className, children }: { project: Project; className: string; children: React.ReactNode }) => (
  <Dialog>
    <DialogTrigger asChild>
      <button type="button" className={`${className} w-full text-left`} aria-label={`See ${project.name} screens`}>
        {children}
      </button>
    </DialogTrigger>
    <DialogContent className="max-w-[min(94vw,980px)] border-2 border-foreground sm:rounded-2xl p-5 sm:p-7" style={{ textTransform: "none" }}>
      <div className="pr-8">
        <DialogTitle className="font-display text-2xl">{project.name}</DialogTitle>
        <DialogDescription className="mt-1">{project.line}</DialogDescription>
      </div>
      <ScreenStrip name={project.name} shots={project.gallery ?? []} />
      {project.to && (
        <Link
          to={project.to}
          className="pop-hover pop-sm justify-self-center inline-flex items-center gap-1.5 rounded-full border border-foreground bg-card text-foreground px-4 py-2 text-sm font-semibold"
        >
          Read the case study <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      )}
    </DialogContent>
  </Dialog>
);

const EvidenceBody = ({ kind }: { kind: EvidenceChapter["evidence"] }) => {
  const label = "mono-label text-primary mb-3";
  if (kind === "dashboard")
    return (
      <div>
        <motion.p variants={ITEM} className={label}>Evidence · a dashboard I built</motion.p>
        <motion.div variants={ITEM}>
        <Link to="/portfolio/sales-overview-dashboard" className="group pop-hover pop-sm block rounded-xl border border-foreground bg-card overflow-hidden text-foreground">
          <img src={salesOverviewImg} alt="Sales Overview dashboard built in Tableau" loading="lazy" className="w-full aspect-[16/9] max-h-52 object-cover object-top transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none" />
          <span className="flex items-center justify-between gap-2 p-3">
            <span>
              <span className="block font-display font-bold">Sales Overview Dashboard</span>
              <span className="block text-xs text-muted-foreground group-hover:text-primary-foreground/80">Tableau · KPIs, regions, trends and top sellers</span>
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </span>
        </Link>
        </motion.div>
        <ul className="mt-4 grid grid-cols-2 gap-2 text-xs">
          {[
            ["2025 – now", "BI Engineer, Prime Video"],
            ["2021 – 2023", "Data, World Food Programme, Kabul"],
            ["2022 & 2023", "Tableau Public Ambassador"],
            ["2021", "Tableau Public Featured Author"],
          ].map(([when, what]) => (
            <motion.li variants={ITEM} key={what} className="rounded-xl border border-foreground/30 px-3 py-2">
              <span className="block font-mono text-[10px] text-primary">{when}</span>
              <span className="block font-semibold">{what}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    );
  if (kind === "experiment")
    return (
      <div>
        <motion.p variants={ITEM} className={label}>Evidence · an early experiment</motion.p>
        <motion.div variants={ITEM} className="flex gap-4 items-start rounded-xl border border-foreground/30 p-3 mb-3">
          <img src={inukkiImg} alt="Inukki, a digital closet app" loading="lazy" className="h-28 w-20 shrink-0 rounded-lg object-cover object-top border border-foreground/20" />
          <div>
            <p className="font-display font-bold">Inukki</p>
            <p className="text-xs text-muted-foreground">A digital closet and style assistant, as an app you install to your phone's home screen.</p>
          </div>
        </motion.div>
        <ol className="space-y-2">
          {[
            ["Before", "My first website was built in WordPress with the Divi page builder: I could arrange what a theme allowed, not build my own.", false],
            ["Discovery", "Prototyped Inukki in Lovable, an AI app builder.", false],
            ["After", "Moved it into my own codebase with Claude Code and deployed it on Vercel.", false],
          ].map(([h, t, todo], n) => (
            <motion.li variants={ITEM} key={h as string} className="flex gap-3 rounded-xl border border-foreground/30 px-3 py-2.5">
              <span className="h-7 w-7 shrink-0 rounded-full bg-primary text-primary-foreground grid place-items-center font-display font-bold text-xs">{n + 1}</span>
              <div>
                <p className="font-display font-bold text-sm">{h}</p>
                <p className={`text-xs ${todo ? "text-muted-foreground italic" : ""}`}>{t}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    );
  if (kind === "projects")
    return (
      <div>
        <motion.p variants={ITEM} className={label}>Evidence · what I've built</motion.p>
        <motion.p variants={ITEM} className="-mt-1 mb-3 text-sm font-semibold">Most of these are used by my friends and me.</motion.p>
        <ul className="grid sm:grid-cols-2 gap-2">
          {PROJECTS.map((p) => {
            const body = (
              <>
                <span className="flex items-center gap-2.5">
                  {p.img ? (
                    <span className="h-12 w-10 shrink-0 overflow-hidden rounded-md border-2 border-foreground bg-black">
                      <img src={p.img} alt="" loading="lazy" className="h-full w-full object-cover object-top transition-[object-position] [transition-duration:2000ms] ease-in-out group-hover:object-bottom motion-reduce:transition-none" />
                    </span>
                  ) : (
                    <span aria-hidden className="h-12 w-10 shrink-0 rounded-md border-2 border-foreground bg-primary text-primary-foreground grid place-items-center font-display font-bold">
                      {p.name[0]}
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block font-display font-bold leading-tight">{p.name}</span>
                    <span className="mt-1 flex items-center gap-1.5">
                      <Status kind={p.kind}>{p.status}</Status>
                      {p.gallery && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold" aria-hidden>
                          <Images className="h-3 w-3" />
                          {p.gallery.length}
                        </span>
                      )}
                    </span>
                  </span>
                </span>
                <span className={`mt-2 block text-xs leading-snug text-muted-foreground ${p.to || p.href || p.gallery ? "group-hover:text-primary-foreground/80" : ""}`}>{p.line}</span>
              </>
            );
            return (
              <motion.li variants={ITEM} key={p.name}>
                {p.gallery ? (
                  <ScreensCard project={p} className="group pop-hover pop-sm block h-full rounded-xl border border-foreground bg-card px-3 py-2.5 text-foreground">
                    {body}
                  </ScreensCard>
                ) : p.to ? (
                  <Link to={p.to} className="group pop-hover pop-sm block h-full rounded-xl border border-foreground bg-card px-3 py-2.5 text-foreground">{body}</Link>
                ) : p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.name} (opens in a new tab)`}
                    className="group pop-hover pop-sm block h-full rounded-xl border border-foreground bg-card px-3 py-2.5 text-foreground"
                  >
                    {body}
                  </a>
                ) : (
                  <div className={`h-full rounded-xl px-3 py-2.5 ${p.kind === "todo" ? "border border-dashed border-foreground/40" : "border border-foreground/60 bg-card"}`}>{body}</div>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    );
  if (kind === "learning")
    return (
      <div>
        <motion.p variants={ITEM} className={label}>Evidence · decisions from my own projects</motion.p>
        <ul className="grid sm:grid-cols-2 gap-2">
          {LEARNING.map((l) => (
            <motion.li variants={ITEM} key={l.kind} className={`rounded-xl px-3 py-2.5 sm:[&:last-child:nth-child(odd)]:col-span-2 ${l.where ? "border border-foreground/30" : "border border-dashed border-foreground/40"}`}>
              <span className="flex items-center justify-between gap-2">
                <span className="mono-label text-[10px] text-primary">{l.kind}</span>
                {l.where ? <Status kind="build">{l.where}</Status> : <Status kind="todo">To add</Status>}
              </span>
              <span className={`mt-1 block text-[13px] leading-snug ${l.where ? "" : "text-muted-foreground italic"}`}>{l.text}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    );
  return (
    <div>
      <motion.p variants={ITEM} className={label}>Evidence · the road ahead</motion.p>
      <ul className="space-y-2">
        {ROADMAP.map((m) => (
          <motion.li variants={ITEM} key={m.text} className={`flex items-start gap-3 rounded-xl px-4 py-2.5 ${m.done ? "border border-foreground/30" : "border border-dashed border-foreground/40"}`}>
            {m.done ? <DrawCheck /> : <Circle className="h-5 w-5 shrink-0 text-muted-foreground mt-0.5" aria-label="Upcoming" />}
            <span className={`text-sm ${m.done ? "font-semibold" : "text-muted-foreground italic"}`}>{m.text}</span>
          </motion.li>
        ))}
      </ul>
      <motion.div variants={ITEM} className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
        {[
          ["Learning", "Product discovery: research first, then the brief, then the build", false],
          ["Building", "PlantFam, CueRecord, ReelFeel, Thyve and more", false],
          ["Heading", "AI Product Manager roles", false],
        ].map(([h, t, todo]) => (
          <span key={h as string} className={`rounded-lg px-2.5 py-2 ${todo ? "border border-dashed border-foreground/40" : "border border-foreground/30"}`}>
            <span className="block font-semibold">{h}</span>
            <span className={`block mt-0.5 ${todo ? "text-muted-foreground italic" : "text-muted-foreground"}`}>{t}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export const JourneyStory = () => {
  const { reduced } = useMotion();
  const [chapter, setChapter] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setChapter(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  const jump = (i: number) => refs.current[i]?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
  const railRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start center", "end center"] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <section aria-labelledby="journey-title" className="py-10 lg:py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <Intro />
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-x-12 xl:gap-x-16 items-start">
          <ol ref={railRef} className="relative">
            <span aria-hidden className="absolute left-[19px] sm:left-[23px] top-6 bottom-6 border-l-2 border-dashed border-foreground/25" />
            {/* The rail fills in the accent colour as you read down it. */}
            <motion.span
              aria-hidden
              style={{ scaleY: reduced ? scrollYProgress : fill }}
              className="absolute left-[19px] sm:left-[23px] top-6 bottom-6 w-[2px] -ml-px bg-primary origin-top"
            />
            {EVIDENCE_CHAPTERS.map((c, i) => {
              const last = i === EVIDENCE_CHAPTERS.length - 1;
              return (
                <li key={c.title} className="relative pl-14 sm:pl-[4.5rem] pb-10 last:pb-0 lg:pb-0 lg:min-h-[58vh] lg:flex lg:items-center">
                  <span aria-hidden className="absolute left-0 top-1 lg:top-1/2 lg:-translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12">
                    <motion.span
                      animate={reduced ? undefined : { scale: i === chapter ? 1.15 : 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 18 }}
                      className={`relative z-10 h-full w-full rounded-full border-2 border-foreground flex items-center justify-center font-display font-bold text-sm sm:text-base transition-colors duration-300 ${
                        i <= chapter ? "bg-primary text-primary-foreground" : "bg-background text-foreground"
                      }`}
                    >
                      {i + 1}
                    </motion.span>
                    {/* A ripple each time this chapter becomes the one you're reading. */}
                    {i === chapter && !reduced && (
                      <motion.span
                        key={`ripple-${chapter}`}
                        initial={{ scale: 1, opacity: 0.7 }}
                        animate={{ scale: 1.9, opacity: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full border-2 border-primary"
                      />
                    )}
                  </span>
                  <motion.div
                    className="w-full"
                    initial={reduced ? false : { opacity: 0, x: -28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, ease: EASE }}
                  >
                  <article
                    ref={(el) => (refs.current[i] = el)}
                    data-i={i}
                    className={`brutal-card w-full p-5 sm:p-7 transition-opacity duration-300 ${last ? "!bg-primary !text-primary-foreground" : ""} ${i === chapter ? "" : "lg:opacity-50"}`}
                    style={{ textTransform: "none" }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <motion.span
                        aria-hidden
                        animate={reduced || i !== chapter ? { rotate: 0 } : { rotate: [0, -12, 10, -6, 0] }}
                        transition={{ duration: 0.6 }}
                        className={`h-9 w-9 rounded-xl flex items-center justify-center border border-foreground ${last ? "bg-primary-foreground text-primary" : "bg-primary/20 text-foreground"}`}
                      >
                        <c.icon className="h-5 w-5" />
                      </motion.span>
                      <p className={`mono-label ${last ? "!text-primary-foreground" : "text-primary"}`}>{c.subtitle}</p>
                    </div>
                    <h2 className="font-display font-bold text-2xl sm:text-3xl leading-tight text-balance">{c.title}</h2>
                    <p className={`mt-3 text-sm sm:text-base ${last ? "text-primary-foreground/85" : "text-muted-foreground"}`}>{c.body}</p>
                    {c.note && <p className="mt-2 text-sm">{c.note}</p>}
                    <p className={`mt-4 pl-4 border-l-4 text-sm sm:text-[15px] font-semibold italic ${last ? "border-primary-foreground" : "border-primary"}`}>{c.takeaway}</p>
                    {c.link && (
                      <Link
                        to={c.link.to}
                        className={`pop-hover pop-sm mt-4 inline-flex items-center gap-1 rounded-full border border-foreground px-3.5 py-1.5 text-xs font-semibold ${last ? "bg-primary-foreground text-primary" : "bg-card text-foreground"}`}
                      >
                        {c.link.label} <ArrowUpRight className="h-3 w-3" aria-hidden />
                      </Link>
                    )}
                    {/* Phones and tablets: the evidence sits inside its own chapter. */}
                    <div className={`lg:hidden mt-6 rounded-2xl border border-foreground/30 p-4 ${last ? "bg-background text-foreground" : "bg-background/40"}`}>
                      <EvidencePanel kind={c.evidence} inline />
                    </div>
                  </article>
                  </motion.div>
                </li>
              );
            })}
          </ol>

          {/* Desktop: the evidence for the chapter you're reading. */}
          <aside className="hidden lg:block sticky top-20 self-start" aria-label="Evidence for this chapter" style={{ textTransform: "none" }}>
            <div className="brutal-card max-h-[calc(100vh-7rem)] flex flex-col overflow-hidden">
              {/* Where you are in the story. */}
              <div className="shrink-0 px-5 pt-4 pb-3 border-b border-foreground/15">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display font-bold text-sm truncate">{EVIDENCE_CHAPTERS[chapter].title}</span>
                  <span className="font-mono text-xs text-muted-foreground tabular-nums">
                    <motion.span key={chapter} initial={reduced ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="inline-block text-primary font-semibold">
                      {String(chapter + 1).padStart(2, "0")}
                    </motion.span>{" "}
                    / 05
                  </span>
                </div>
                <div className="mt-2 h-1 rounded-full bg-foreground/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary origin-left"
                    animate={{ scaleX: (chapter + 1) / EVIDENCE_CHAPTERS.length }}
                    transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 20 }}
                  />
                </div>
              </div>
              <div className="min-h-0 overflow-y-auto p-5">
                <motion.div
                  key={chapter}
                  initial={reduced ? false : { opacity: 0, y: 12, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.4, ease: EASE }}
                  aria-live="polite"
                >
                  <EvidencePanel kind={EVIDENCE_CHAPTERS[chapter].evidence} />
                </motion.div>
              </div>
            </div>
            <div className="mt-5 flex justify-center gap-2" role="group" aria-label="Jump to a chapter">
              {EVIDENCE_CHAPTERS.map((c, i) => (
                <button
                  key={c.title}
                  type="button"
                  onClick={() => jump(i)}
                  aria-label={`Chapter ${i + 1}: ${c.title}`}
                  aria-current={i === chapter}
                  className={`h-2.5 rounded-full border border-foreground transition-all ${i === chapter ? "w-8 bg-primary" : "w-2.5 bg-transparent hover:bg-foreground/30"}`}
                />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
