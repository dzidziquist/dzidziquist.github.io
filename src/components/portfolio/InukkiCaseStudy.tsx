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

const SectionHeading = ({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 rounded-lg bg-primary/10">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <h2 className="text-2xl font-display font-bold">{title}</h2>
  </div>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3">
        <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
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
}) => (
  <div className="rounded-xl border border-border bg-card p-5">
    <div className="flex items-center gap-2 mb-3">
      <Icon className="h-4 w-4 text-primary" />
      <h4 className="font-display font-semibold">{title}</h4>
    </div>
    <ul className="space-y-1.5 text-sm text-muted-foreground">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/40 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const InukkiCaseStudy = () => {
  return (
    <>
      {/* Features */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <SectionHeading icon={Lightbulb} title="Features" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
              <FeatureCard
                icon={Shirt}
                title="Digital Closet"
                items={[
                  "Photos",
                  "Categories",
                  "Colors",
                  "Tags & metadata",
                ]}
              />
              <FeatureCard
                icon={Layers}
                title="Outfit Builder"
                items={[
                  "Combine clothing into full outfits",
                  "AI-based scoring",
                  "Save favorite combinations",
                ]}
              />
              <FeatureCard
                icon={Calendar}
                title="Outfit Planner"
                items={[
                  "Calendar-based outfit planning",
                  "Weather previews",
                  "Daily outfit suggestions",
                ]}
              />
              <FeatureCard
                icon={Brain}
                title="AI Style Assistant"
                items={[
                  "Personalized outfit recommendations",
                  "Context-aware style advice",
                  "Clothing analysis via AI",
                ]}
              />
              <FeatureCard
                icon={BarChart3}
                title="Wardrobe Insights"
                items={[
                  "Wear frequency tracking",
                  "Category breakdowns",
                  "Style usage patterns",
                ]}
              />
              <FeatureCard
                icon={CloudSun}
                title="Weather Integration"
                items={[
                  "Weather-aware outfit recommendations",
                  "Backend weather retrieval via Edge Functions",
                ]}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why PWA */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <SectionHeading icon={Smartphone} title="Why PWA (By Design)" />
            <div className="max-w-3xl space-y-4 text-muted-foreground">
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
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <SectionHeading icon={Zap} title="Project Evolution" />
            <div className="max-w-3xl space-y-10">
              {/* Phase 1 */}
              <div>
                <h3 className="font-display font-semibold text-lg mb-3">
                  Phase 1 — Lovable (Rapid Validation)
                </h3>
                <div className="space-y-3 text-muted-foreground">
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

              {/* Phase 2 */}
              <div>
                <h3 className="font-display font-semibold text-lg mb-3">
                  Phase 2 — Claude Code (Infrastructure Ownership)
                </h3>
                <div className="space-y-3 text-muted-foreground">
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
                    self-managed, scalable architecture. This transition reflects
                    a shift from accelerated scaffolding to full engineering
                    ownership.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <SectionHeading icon={Wrench} title="Tech Stack" />
            <div className="max-w-3xl rounded-2xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-display font-semibold">
                      Layer
                    </TableHead>
                    <TableHead className="font-display font-semibold">
                      Technology
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { layer: "Frontend", tech: "React 18, TypeScript, Vite" },
                    {
                      layer: "Styling",
                      tech: "Tailwind CSS, shadcn/ui, Framer Motion",
                    },
                    {
                      layer: "State",
                      tech: "TanStack React Query, React Context",
                    },
                    {
                      layer: "Backend",
                      tech: "Supabase (PostgreSQL, Auth, Edge Functions, Storage)",
                    },
                    {
                      layer: "AI",
                      tech: "Google Gemini via Supabase Edge Functions",
                    },
                    { layer: "Weather", tech: "Edge Function integration" },
                    { layer: "Deployment", tech: "Vercel" },
                    {
                      layer: "Testing",
                      tech: "Vitest, React Testing Library",
                    },
                    { layer: "Version Control", tech: "GitHub" },
                    { layer: "App Type", tech: "Progressive Web App (PWA)" },
                  ].map((row) => (
                    <TableRow key={row.layer}>
                      <TableCell className="font-medium">{row.layer}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.tech}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <SectionHeading icon={Layers} title="Architecture" />
            <div className="max-w-2xl">
              <pre className="rounded-2xl border border-border bg-card p-6 text-xs sm:text-sm font-mono text-muted-foreground overflow-x-auto leading-relaxed">
                {`┌─────────────────────────────────────────┐
│ React SPA (Vite + PWA) │
│ TypeScript · Tailwind CSS · shadcn/ui │
│ Framer Motion · TanStack Query │
├─────────────────────────────────────────┤
│ Supabase │
│ Auth · PostgreSQL · Edge Functions │
│ Storage (closet-images bucket) │
├─────────────────────────────────────────┤
│ AI Integration │
│ Google Gemini via Edge Functions │
│ Clothing analysis · Style suggestions │
├─────────────────────────────────────────┤
│ Deployment │
│ Vercel │
└─────────────────────────────────────────┘`}
              </pre>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testing Strategy */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <SectionHeading icon={TestTube} title="Testing Strategy" />
            <div className="max-w-3xl space-y-6 text-muted-foreground">
              <p>Inukki is currently in controlled beta testing.</p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-2">
                    Distribution
                  </h4>
                  <BulletList
                    items={[
                      "PWA installation (iOS Safari & Android Chrome)",
                      "No app store dependency",
                    ]}
                  />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-2">
                    Quantitative Metrics
                  </h4>
                  <BulletList
                    items={[
                      "Closet item uploads",
                      "Outfit creation frequency",
                      "AI assistant interactions",
                      "Daily return usage",
                    ]}
                  />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-2">
                    Qualitative Feedback
                  </h4>
                  <BulletList
                    items={[
                      "Direct tester interviews",
                      "Friction point analysis",
                      "UI clarity validation",
                    ]}
                  />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-2">
                    Iteration Loop
                  </h4>
                  <p className="text-sm">
                    Test → Analyze behavior → Improve prompts/UI → Deploy
                    instantly via PWA
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Process & Learnings */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <SectionHeading icon={GraduationCap} title="Process & Learnings" />
            <div className="max-w-3xl grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-display font-semibold mb-2">
                  From Personal Problem → Functional Product
                </h4>
                <p className="text-sm text-muted-foreground">
                  Converted a real-life frustration into a working AI system.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-display font-semibold mb-2">
                  Evolving Vibe Coding
                </h4>
                <p className="text-sm text-muted-foreground">
                  Started with AI-assisted rapid build in Lovable, then
                  transitioned to AI-assisted engineering in Claude Code.
                  Learned to balance generative coding with architectural
                  intent.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-display font-semibold mb-2">
                  Secure AI Integration
                </h4>
                <p className="text-sm text-muted-foreground">
                  Moved AI calls to Supabase Edge Functions to protect API keys,
                  validate requests, log usage, and maintain backend control.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-display font-semibold mb-2">
                  Mobile-First Thinking
                </h4>
                <p className="text-sm text-muted-foreground">
                  Designed bottom navigation and thumb-friendly flows first, not
                  as an afterthought.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 sm:col-span-2">
                <h4 className="font-display font-semibold mb-2">
                  Product Discipline
                </h4>
                <p className="text-sm text-muted-foreground">
                  Validated through real testers before scaling complexity.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <SectionHeading icon={TrendingUp} title="Impact" />
            <div className="max-w-3xl space-y-4 text-muted-foreground">
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
              <p className="pt-2 font-medium text-foreground">
                Inukki reflects both technical execution and product ownership.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <SectionHeading icon={Rocket} title="Next Steps" />
            <div className="max-w-3xl space-y-6 text-muted-foreground">
              <div>
                <h4 className="font-display font-semibold text-foreground mb-2">
                  Product
                </h4>
                <BulletList
                  items={[
                    "Improve AI personalization using wear history",
                    "Add seasonal capsule wardrobe intelligence",
                    "Enhance wardrobe analytics",
                  ]}
                />
              </div>
              <div>
                <h4 className="font-display font-semibold text-foreground mb-2">
                  Engineering
                </h4>
                <BulletList
                  items={[
                    "Expand automated test coverage",
                    "Implement structured logging & monitoring",
                    "Optimize caching for performance",
                  ]}
                />
              </div>
              <div>
                <h4 className="font-display font-semibold text-foreground mb-2">
                  Testing Strategy Expansion
                </h4>
                <BulletList
                  items={[
                    "Structured user surveys",
                    "In-app feedback collection",
                    "Retention cohort analysis",
                    "A/B testing on AI prompts",
                    "Behavioral analytics dashboard",
                  ]}
                />
              </div>
              <div>
                <h4 className="font-display font-semibold text-foreground mb-2">
                  Long-Term
                </h4>
                <BulletList
                  items={[
                    "Continue refining PWA experience",
                    "Evaluate native build only if metrics justify it",
                  ]}
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};
