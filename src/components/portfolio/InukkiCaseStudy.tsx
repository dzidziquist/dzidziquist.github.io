import { useState } from "react";
import {
  Smartphone,
  AlertTriangle,
  Lightbulb,
  Rocket,
  Wrench,
  TestTube,
  GraduationCap,
  TrendingUp,
  Layers,
  CloudSun,
  Shirt,
  Calendar,
  Brain,
  BarChart3,
  Zap,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRandomColor } from "@/hooks/use-random-color";

const SectionHeading = ({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 border border-foreground bg-primary/10" style={{ boxShadow: 'var(--brutal-shadow-sm)' }}>
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <h2 className="text-2xl font-display font-bold">{title}</h2>
  </div>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3 text-sm">
        <span className="mt-0.5 text-primary font-bold flex-shrink-0">→</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const FeatureCard = ({
  icon: Icon,
  title,
  items,
}: {
  icon: React.ElementType;
  title: string;
  items: string[];
}) => {
  const color = useRandomColor();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="brutal-card p-5 transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? color.accent : undefined,
        boxShadow: hovered ? `4px 4px 0px ${color.accent}` : undefined,
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1 border border-foreground transition-colors duration-300"
          style={{ borderColor: hovered ? color.accent : undefined }}
        >
          <Icon className="h-4 w-4 transition-colors duration-300" style={{ color: hovered ? color.accent : undefined }} />
        </div>
        <h4 className="font-display font-bold text-sm transition-colors duration-300"
          style={{ color: hovered ? color.accent : undefined }}
        >{title}</h4>
      </div>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-0.5 font-bold flex-shrink-0 transition-colors duration-300"
              style={{ color: hovered ? color.accent : undefined }}
            >→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const LearningCard = ({ title, description }: { title: string; description: string }) => {
  const color = useRandomColor();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="brutal-card p-5 transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? color.accent : undefined,
        boxShadow: hovered ? `4px 4px 0px ${color.accent}` : undefined,
      }}
    >
      <h4 className="font-display font-bold text-sm mb-2 transition-colors duration-300"
        style={{ color: hovered ? color.accent : undefined }}
      >
        {title}
      </h4>
      <p className="text-sm text-muted-foreground" style={{ textTransform: 'none' }}>
        {description}
      </p>
    </div>
  );
};

const HoverArchitecture = () => {
  const color = useRandomColor();
  const [hovered, setHovered] = useState(false);

  return (
    <pre
      className="brutal-card p-6 text-xs sm:text-sm font-mono text-muted-foreground overflow-x-auto leading-relaxed transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? color.accent : undefined,
        boxShadow: hovered ? `4px 4px 0px ${color.accent}` : undefined,
      }}
    >
{`┌─────────────────────────────────────────┐
│           React SPA (Vite + PWA)        │
│  TypeScript · Tailwind CSS · shadcn/ui  │
│  Framer Motion · TanStack Query         │
├─────────────────────────────────────────┤
│              Supabase                   │
│  Auth · PostgreSQL · Edge Functions     │
│  Storage (closet-images bucket)         │
├─────────────────────────────────────────┤
│           AI Integration                │
│  Google Gemini via Edge Functions       │
│  Clothing analysis · Style suggestions  │
├─────────────────────────────────────────┤
│              Deployment                 │
│              Vercel                     │
└─────────────────────────────────────────┘`}
    </pre>
  );
};

const HoverTable = () => {
  const color = useRandomColor();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="max-w-3xl brutal-card overflow-hidden transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? color.accent : undefined,
        boxShadow: hovered ? `4px 4px 0px ${color.accent}` : undefined,
      }}
    >
      <Table>
        <TableHeader>
          <TableRow className="border-foreground">
            <TableHead className="font-display font-bold text-foreground">Layer</TableHead>
            <TableHead className="font-display font-bold text-foreground">Technology</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            { layer: "Frontend", tech: "React 18, TypeScript, Vite" },
            { layer: "Styling", tech: "Tailwind CSS, shadcn/ui, Framer Motion" },
            { layer: "State", tech: "TanStack React Query, React Context" },
            { layer: "Backend", tech: "Supabase (PostgreSQL, Auth, Edge Functions, Storage)" },
            { layer: "AI", tech: "Google Gemini via Supabase Edge Functions" },
            { layer: "Weather", tech: "Edge Function integration" },
            { layer: "Deployment", tech: "Vercel" },
            { layer: "Testing", tech: "Vitest, React Testing Library" },
            { layer: "Version Control", tech: "GitHub" },
            { layer: "App Type", tech: "Progressive Web App (PWA)" },
          ].map((row) => (
            <TableRow key={row.layer} className="border-foreground/20">
              <TableCell className="font-bold text-sm">{row.layer}</TableCell>
              <TableCell className="text-muted-foreground text-sm">{row.tech}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export const InukkiCaseStudy = () => {
  return (
    <>
      {/* Features */}
      <section className="py-16 border-t border-foreground">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <SectionHeading icon={Lightbulb} title="Features" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
              <FeatureCard icon={Shirt} title="Digital Closet" items={["Photos", "Categories", "Colors", "Tags & metadata"]} />
              <FeatureCard icon={Layers} title="Outfit Builder" items={["Combine clothing into full outfits", "AI-based scoring", "Save favorite combinations"]} />
              <FeatureCard icon={Calendar} title="Outfit Planner" items={["Calendar-based outfit planning", "Weather previews", "Daily outfit suggestions"]} />
              <FeatureCard icon={Brain} title="AI Style Assistant" items={["Personalized outfit recommendations", "Context-aware style advice", "Clothing analysis via AI"]} />
              <FeatureCard icon={BarChart3} title="Wardrobe Insights" items={["Wear frequency tracking", "Category breakdowns", "Style usage patterns"]} />
              <FeatureCard icon={CloudSun} title="Weather Integration" items={["Weather-aware outfit recommendations", "Backend weather retrieval via Edge Functions"]} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why PWA */}
      <section className="py-16 border-t border-foreground">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <SectionHeading icon={Smartphone} title="Why PWA (By Design)" />
            <div className="max-w-3xl space-y-4 text-muted-foreground text-sm">
              <p>
                Inukki is intentionally built as a Progressive Web App rather
                than a native app because it:
              </p>
              <BulletList
                items={[
                  "Enables instant updates without app store approvals",
                  "Reduces beta testing friction",
                  "Maintains a single cross-platform codebase",
                  "Allows rapid iteration",
                  "Provides a native-like install experience",
                  "Simplifies distribution and onboarding",
                ]}
              />
              <p className="pt-2">
                The focus is validating product-market fit before investing in
                native platform builds.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Project Evolution */}
      <section className="py-16 border-t border-foreground">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <SectionHeading icon={Zap} title="Project Evolution" />
            <div className="max-w-3xl space-y-10">
              <div>
                <h3 className="font-display font-bold text-lg mb-3 border-b border-foreground pb-2">
                  Phase 1 — Lovable (Rapid Validation)
                </h3>
                <div className="space-y-3 text-muted-foreground text-sm">
                  <p>
                    The initial production build was created in Lovable, which
                    supports React + TypeScript, structured folder organization,
                    Supabase integration, Edge Functions, and PWA configuration.
                  </p>
                  <p>
                    Lovable enabled rapid prototyping through vibe coding while
                    maintaining proper structure. It allowed me to validate core
                    workflows quickly and distribute the app via PWA without
                    infrastructure overhead.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg mb-3 border-b border-foreground pb-2">
                  Phase 2 — Claude Code (Infrastructure Ownership)
                </h3>
                <div className="space-y-3 text-muted-foreground text-sm">
                  <p>
                    I migrated the project to Claude Code not because Lovable
                    lacked structure, but because I wanted:
                  </p>
                  <BulletList
                    items={[
                      "Full repository ownership",
                      "Architectural flexibility",
                      "Custom testing setup (Vitest + React Testing Library)",
                      "Fine-grained dependency management",
                      "Deeper AI orchestration control",
                      "Direct CI/CD deployment to Vercel",
                    ]}
                  />
                  <p className="pt-2">
                    I continue to use vibe coding — but now within a fully
                    self-managed, scalable architecture.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 border-t border-foreground">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <SectionHeading icon={Wrench} title="Tech Stack" />
            <HoverTable />
          </AnimatedSection>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-16 border-t border-foreground">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <SectionHeading icon={Layers} title="Architecture" />
            <div className="max-w-2xl">
              <HoverArchitecture />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testing Strategy */}
      <section className="py-16 border-t border-foreground">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <SectionHeading icon={TestTube} title="Testing Strategy" />
            <div className="max-w-3xl space-y-6 text-muted-foreground text-sm">
              <p>Inukki is currently in controlled beta testing.</p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-display font-bold text-foreground mb-2 text-sm">Distribution</h4>
                  <BulletList items={["PWA installation (iOS Safari & Android Chrome)", "No app store dependency"]} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-foreground mb-2 text-sm">Quantitative Metrics</h4>
                  <BulletList items={["Closet item uploads", "Outfit creation frequency", "AI assistant interactions", "Daily return usage"]} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-foreground mb-2 text-sm">Qualitative Feedback</h4>
                  <BulletList items={["Direct tester interviews", "Friction point analysis", "UI clarity validation"]} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-foreground mb-2 text-sm">Iteration Loop</h4>
                  <p className="text-sm">
                    Test → Analyze behavior → Improve prompts/UI → Deploy instantly via PWA
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Process & Learnings */}
      <section className="py-16 border-t border-foreground">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <SectionHeading icon={GraduationCap} title="Process & Learnings" />
            <div className="max-w-3xl grid sm:grid-cols-2 gap-4">
              <LearningCard title="From Personal Problem → Functional Product" description="Converted a real-life frustration into a working AI system." />
              <LearningCard title="Evolving Vibe Coding" description="Started with AI-assisted rapid build in Lovable, then transitioned to AI-assisted engineering in Claude Code. Learned to balance generative coding with architectural intent." />
              <LearningCard title="Secure AI Integration" description="Moved AI calls to Supabase Edge Functions to protect API keys, validate requests, log usage, and maintain backend control." />
              <LearningCard title="Mobile-First Thinking" description="Designed bottom navigation and thumb-friendly flows first, not as an afterthought." />
              <LearningCard title="Product Discipline" description="Validated through real testers before scaling complexity." />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 border-t border-foreground">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <SectionHeading icon={TrendingUp} title="Impact" />
            <div className="max-w-3xl space-y-4 text-muted-foreground text-sm">
              <BulletList
                items={[
                  "Shipped a full-stack AI application independently",
                  "Migrated from platform-managed build to self-owned infrastructure",
                  "Combined frontend, backend, AI, and deployment workflows",
                  "Demonstrated iterative product development",
                  "Built and deployed production-ready architecture",
                  "Practiced real-world testing before expansion",
                ]}
              />
              <p className="pt-2 font-bold text-foreground">
                Inukki reflects both technical execution and product ownership.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 border-t border-foreground">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <SectionHeading icon={Rocket} title="Next Steps" />
            <div className="max-w-3xl space-y-6 text-muted-foreground text-sm">
              <div>
                <h4 className="font-display font-bold text-foreground mb-2 text-sm">Product</h4>
                <BulletList items={["Improve AI personalization using wear history", "Add seasonal capsule wardrobe intelligence", "Enhance wardrobe analytics"]} />
              </div>
              <div>
                <h4 className="font-display font-bold text-foreground mb-2 text-sm">Engineering</h4>
                <BulletList items={["Expand automated test coverage", "Implement structured logging & monitoring", "Optimize caching for performance"]} />
              </div>
              <div>
                <h4 className="font-display font-bold text-foreground mb-2 text-sm">Testing Strategy Expansion</h4>
                <BulletList items={["Structured user surveys", "In-app feedback collection", "Retention cohort analysis", "A/B testing on AI prompts", "Behavioral analytics dashboard"]} />
              </div>
              <div>
                <h4 className="font-display font-bold text-foreground mb-2 text-sm">Long-Term</h4>
                <BulletList items={["Continue refining PWA experience", "Evaluate native build only if metrics justify it"]} />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};
