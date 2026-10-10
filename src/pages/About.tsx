import profileCut from "@/assets/dzidzi-profile-cut.webp";
import { HobbyParagraph } from "@/components/about/HobbyParagraph";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMotion } from "@/hooks/use-motion";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import catIllustration from "@/assets/hobbies/waving.webp";
import profileImage from "@/assets/dzidzi-profile.png";
import { Mail, Twitter, Instagram, Linkedin, Github, Award, BarChart3 } from "lucide-react";
import { useRandomColor } from "@/hooks/use-random-color";
import { useDocumentTitle } from "@/hooks/use-document-title";

const SkillTag = ({ label }: { label: string }) => {
  const color = useRandomColor();
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className="brutal-tag transition-all duration-300 cursor-default"
      onMouseEnter={() => setHovered(true)}
      onFocus={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onBlur={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? color.accent : undefined,
        color: hovered ? color.fg : undefined,
        borderColor: hovered ? color.accent : undefined,
      }}
    >
      {label}
    </span>
  );
};

// Softens the photo's cropped bottom and right edges into the page.
const PHOTO_FADE = "linear-gradient(to top, transparent 0%, #000 22%), linear-gradient(to left, transparent 0%, #000 16%)";

/** Preview switch: /about?p=cut (cut-out, no frame) or ?p=circle (round crop, no shadow). */
const HoverProfileImage = ({ src, alt, onClick }: { src: string; alt: string; isClicked: boolean; onClick: () => void }) => {
  const variant = new URLSearchParams(window.location.search || window.location.hash.split("?")[1] || "").get("p") ?? "cut";
  if (variant === "circle") {
    return (
      <motion.div className="cursor-pointer" onClick={onClick} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-foreground">
          <img src={src} alt={alt} className="w-full h-full object-cover object-top" />
        </div>
      </motion.div>
    );
  }
  return (
    <motion.img
      src={profileCut}
      alt={alt}
      className="w-56 md:w-64 h-auto cursor-pointer select-none"
      style={{ maskImage: PHOTO_FADE, WebkitMaskImage: PHOTO_FADE, maskComposite: "intersect", WebkitMaskComposite: "source-in" }}
      draggable={false}
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    />
  );
};

const skills = ["Tableau", "Python", "SQL", "Redshift", "Data Visualization", "Data Analysis", "Amazon Quicksight", "Core AI/ML Skills", "AWS"];

const contacts = [
  { icon: Mail, label: "Email", value: "maureendzifa.awumeequist@gmail.com", href: "mailto:maureendzifa.awumeequist@gmail.com" },
  { icon: Twitter, label: "Twitter", value: "@dzidzi_quist", href: "https://twitter.com/dzidzi_quist" },
  { icon: Instagram, label: "Instagram", value: "@dzidzi_quist", href: "https://instagram.com/dzidzi_quist" },
  { icon: Linkedin, label: "LinkedIn", value: "Maureen", href: "https://linkedin.com/in/maureen-dzifa-quist" },
  { icon: Github, label: "GitHub", value: "dzidziquist", href: "https://github.com/dzidziquist" },
  { icon: BarChart3, label: "Tableau Public", value: "Tableau Public", href: "https://public.tableau.com/app/profile/maureen.dzifa.awumee.quist" },
  { icon: Award, label: "Certification", value: "Credly", href: "https://www.credly.com/users/maureendzifa_awumeequist/badges" },
];


/** Sticker that hops to a new spot in the colour block whenever the mouse gets close (or when tapped). */
const DodgeTag = ({ panel, start, rotate, className, style, label, children }: {
  panel: React.RefObject<HTMLDivElement>;
  start: { x: number; y: number };
  rotate: number;
  className: string;
  style: React.CSSProperties;
  label: string;
  children: React.ReactNode;
}) => {
  const tag = useRef<HTMLDivElement>(null);
  const { reduced } = useMotion();
  const [pos, setPos] = useState(start);

  const hop = (mx: number, my: number) => {
    const box = panel.current!.getBoundingClientRect();
    let best = pos, bestD = -1;
    // Keep the whole sticker inside the colour block, whatever its width.
    const t = tag.current!.getBoundingClientRect();
    const maxX = Math.max(5, 97 - (t.width / box.width) * 100);
    const maxY = Math.max(5, 95 - (t.height / box.height) * 100);
    for (let k = 0; k < 8; k++) {
      const c = { x: 3 + Math.random() * (maxX - 3), y: 3 + Math.random() * (maxY - 3) };
      const d = Math.hypot(box.left + (c.x / 100) * box.width - mx, box.top + (c.y / 100) * box.height - my);
      if (d > bestD) { best = c; bestD = d; }
    }
    setPos(best);
  };

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      if (reduced || e.pointerType !== "mouse" || !tag.current) return;
      const r = tag.current.getBoundingClientRect();
      const dx = Math.max(r.left - e.clientX, 0, e.clientX - r.right);
      const dy = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom);
      if (Math.hypot(dx, dy) < 40) hop(e.clientX, e.clientY);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  });

  return (
    <motion.div
      ref={tag}
      onPointerDown={(e) => e.pointerType !== "mouse" && hop(e.clientX, e.clientY)}
      role="button"
      tabIndex={0}
      aria-label={`${label} sticker. Press to move it`}
      onKeyDown={(e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        const r = tag.current!.getBoundingClientRect();
        hop(r.left + r.width / 2, r.top + r.height / 2);
      }}
      initial={{ opacity: 0, scale: 0.6, rotate: rotate - 6 }}
      animate={{ opacity: 1, scale: 1, rotate, left: `${pos.x}%`, top: `${pos.y}%` }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={`absolute z-20 px-4 py-1.5 lg:px-6 lg:py-2 rounded-full border-[3px] border-foreground font-bold text-lg sm:text-xl lg:text-2xl xl:text-3xl whitespace-nowrap cursor-pointer select-none ${className}`}
      style={{ boxShadow: "3px 3px 0 hsl(var(--foreground))", textTransform: "none", ...style }}
    >
      {children}
    </motion.div>
  );
};

/** Kristi-style colour block: accent panel, outlined blob, cut-out photo, floating tool stickers. */
const PhotoPanel = () => {
  const panelRef = useRef<HTMLDivElement>(null);
  return (
  <div ref={panelRef} className="relative overflow-hidden bg-primary py-14 sm:py-16 lg:py-0 lg:sticky lg:top-[68px] lg:h-[calc(100vh-68px)] lg:self-start flex items-center justify-center">
    {/* Photo circle: lifts and tilts on hover, with a spinning text badge on its edge */}
    <motion.div
      className="relative w-[min(62vw,260px)] sm:w-[300px] lg:w-[74%] xl:w-[64%] lg:mt-6 max-w-[420px] aspect-square group"
      whileHover={{ y: -8, rotate: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      <div
        className="absolute inset-0 rounded-full border-[3px] border-foreground overflow-hidden transition-shadow duration-300 shadow-[5px_5px_0_hsl(var(--foreground))] group-hover:shadow-[10px_10px_0_hsl(var(--foreground))]"
        style={{ background: "hsl(var(--pair))" }}
      >
        <img src={profileCut} alt="Maureen Dzifa Quist" className="absolute left-1/2 -translate-x-[46%] bottom-0 w-[96%] h-auto select-none transition-transform duration-500 group-hover:scale-105 origin-bottom" draggable={false} />
      </div>
    </motion.div>
    <DodgeTag panel={panelRef} start={{ x: 8, y: 9 }} rotate={-8} className="font-mono" label="Curly braces" style={{ background: "hsl(var(--pair))", color: "hsl(240 5% 10%)" }}>
      <span aria-hidden>{"{ }"}</span>
    </DodgeTag>
    <DodgeTag panel={panelRef} start={{ x: 70, y: 56 }} rotate={7} className="font-mono" label="Code tag" style={{ background: "hsl(var(--pair))", color: "hsl(240 5% 10%)" }}>
      <span aria-hidden>{"</>"}</span>
    </DodgeTag>
    <DodgeTag panel={panelRef} start={{ x: 52, y: 8 }} rotate={-4} className="font-display" label="Dzidzi" style={{ background: "hsl(var(--pair))", color: "hsl(240 5% 10%)" }}>
      Dzidzi
      <span className="inline-block w-[0.5em] h-[0.5em] ml-[0.1em] rounded-full border-2 border-foreground align-baseline" style={{ background: "hsl(var(--primary))" }} />
    </DodgeTag>
  </div>
  );
};

const About = () => {
  useDocumentTitle("About");
  return (
    <Layout>
      {/* -mt-3 pulls the colour block up to meet the header line (header is 68px, the page starts at 80px). */}
      <section className="grid lg:grid-cols-[3fr_5fr] min-h-[calc(100vh-4rem)] -mt-3">
        {/* Colour block with photo (right on desktop, top on phones) */}
        <PhotoPanel />

            {/* On wide screens the text grows and sits in the middle of the dark side instead of hugging the top left. */}
            <AnimatedSection className="lg:self-center">
              <div className="px-6 sm:px-10 lg:px-20 2xl:px-28 py-12 lg:py-16 max-w-4xl 2xl:max-w-5xl min-[2000px]:max-w-6xl min-[2000px]:mx-auto">
                <h1 className="text-5xl md:text-6xl 2xl:text-7xl min-[2000px]:text-8xl font-display font-bold mb-8">About me</h1>
                <div>
                  <div className="space-y-3 2xl:space-y-4 text-muted-foreground leading-relaxed text-sm xl:text-base 2xl:text-lg min-[2000px]:text-xl mb-5 2xl:mb-7">
                    <p>
                      I am <strong className="text-foreground">Maureen Dzifa Quist (Dzidzi)</strong>, a Business Intelligence Engineer at Amazon Prime Video, where I build large-scale data pipelines and dashboards.
                      More recently, I've been using AI to build AI-powered tools, including a RAG knowledge assistant on AWS Bedrock with agent orchestration. 
                      I am on this AWESOME journey of being better and falling in love with working and playing with data and now, with agents.
                    </p>
                    <p>
                      I am a PROUD alumnus of the University of Southern California, Marshall School of Business. Before working full-time at Amazon, I worked at Amazon Prime Video as a Business Intelligence Engineer Intern for Cinematic Marketing.
                    </p>
                    <p>
                      Once upon a time, I was a data consultant working with the World Food Programme (WFP) in Kabul, Afghanistan. Prior to that, I worked with Fintech Start-ups in Accra, Ghana as data analyst, data scientist intern and data engineering intern respectively. I was also a Tableau Ambassador (2023 & 2022), a Tableau Public Featured author (2021).
                    </p>
                    <p>
                      I believe and thrive in continuous learning to expand my knowledge and skillsets in solving problems.
                      I have come to understand and appreciate that data is powerful — powerful enough that everything we're building with AI rests on it.
                      <strong className="text-foreground">Let's change the world with data.</strong>
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="mb-5 2xl:mb-7">
                    <h2 className="text-sm xl:text-base 2xl:text-lg min-[2000px]:text-xl font-bold text-foreground mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <SkillTag key={skill} label={skill} />
                      ))}
                    </div>
                  </div>

                  {/* Hobbies */}
                  <div className="mb-5 2xl:mb-7">
                    <h2 className="text-sm xl:text-base 2xl:text-lg min-[2000px]:text-xl font-bold text-foreground mb-2">Hobbies & Favorites</h2>
                    <HobbyParagraph />
                  </div>

                  {/* Contact Links */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                    <img
                      src={catIllustration}
                      alt="Dzidzi waving hello"
                      className="w-24 sm:w-32 2xl:w-40 min-[2000px]:w-48 h-auto object-contain"
                    />
                    <div className="min-w-0">
                      <h2 className="text-sm xl:text-base 2xl:text-lg min-[2000px]:text-xl font-bold text-foreground mb-2">Get in Touch</h2>
                      <div className="flex flex-wrap gap-3">
                        {contacts.map((contact) => (
                          <a
                            key={contact.label}
                            href={contact.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs xl:text-sm min-[2000px]:text-base text-muted-foreground hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary"
                          >
                            <contact.icon className="w-3.5 h-3.5" />
                            <span className="break-all">{contact.value}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
      </section>
    </Layout>
  );
};

export default About;
