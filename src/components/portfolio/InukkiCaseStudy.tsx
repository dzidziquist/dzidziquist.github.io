import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Shirt, Brain, Smartphone, Code, Layers, Zap, Database, Globe } from "lucide-react";

const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 rounded-lg bg-primary/10">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <h2 className="text-2xl font-display font-bold">{title}</h2>
  </div>
);

const FeatureCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    className="p-5 rounded-xl border border-border bg-card hover:bg-muted/40 transition-colors"
  >
    <h3 className="font-display font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
  </motion.div>
);

const TechPill = ({ label }: { label: string }) => (
  <span className="px-3 py-1 text-sm bg-secondary rounded-full text-secondary-foreground font-mono">
    {label}
  </span>
);

export const InukkiCaseStudy = () => {
  return (
    <div className="space-y-0">
      {/* Problem / Motivation */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-3xl">
              <SectionHeader icon={Shirt} title="Problem & Motivation" />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Most people own more clothes than they think they do — and wear far fewer than
                  they realise. The wardrobe becomes a blind spot: things get forgotten, outfits
                  get repeated out of habit, and the "I have nothing to wear" feeling persists
                  even in a full closet.
                </p>
                <p>
                  Inukki started from a simple question: <em>what if your wardrobe could think
                  with you?</em> Not just catalogue what you own, but help you actually use it
                  — track what you reach for, surface what's been neglected, and suggest outfits
                  that fit your day, your mood, and your style.
                </p>
                <p>
                  Existing solutions were either too complex (full fashion platforms) or too
                  simple (basic photo grids). There was room for something focused, fast, and
                  browser-native.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-4xl">
              <SectionHeader icon={Zap} title="Key Features" />
              <div className="grid sm:grid-cols-2 gap-4">
                <FeatureCard
                  title="Digital Wardrobe"
                  description="Catalogue every item in your closet with photos, categories, colours, and tags. Your wardrobe lives in the cloud — always with you."
                />
                <FeatureCard
                  title="Outfit Planning"
                  description="Combine items into saved outfits. Plan ahead for the week or browse past combinations to rediscover forgotten looks."
                />
                <FeatureCard
                  title="Wear Tracking"
                  description="Log what you actually wear. See which items get the most love and which have been gathering dust — useful data, simply presented."
                />
                <FeatureCard
                  title="AI Style Recommendations"
                  description="Powered by Google Gemini, Inukki analyses your wardrobe and suggests outfits based on what you own, what you've worn, and your personal style patterns."
                />
                <FeatureCard
                  title="Install-to-Home-Screen PWA"
                  description="Built as a mobile-first Progressive Web App. No app store needed — install directly from your browser for a native-like experience on any device."
                />
                <FeatureCard
                  title="Private by Design"
                  description="Your wardrobe data is yours. Authentication and storage are handled via Supabase with per-user row-level security."
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Tech & Architecture */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-3xl">
              <SectionHeader icon={Layers} title="Tech & Architecture" />
              <div className="space-y-8">
                <div>
                  <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" /> Frontend
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    React 18 with TypeScript and Vite for a fast, type-safe development experience.
                    Tailwind CSS and shadcn/ui handle styling and components, while Framer Motion
                    powers fluid transitions. TanStack React Query manages all server state and
                    caching, keeping the UI snappy even on slow connections.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["React 18", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Framer Motion", "TanStack React Query"].map((t) => (
                      <TechPill key={t} label={t} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                    <Database className="h-4 w-4 text-primary" /> Backend & AI
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    Supabase provides authentication, a PostgreSQL database, and file storage —
                    all with row-level security so each user's wardrobe is fully isolated. AI
                    recommendations are generated through the Google Gemini API, which receives
                    structured wardrobe context and returns personalised outfit suggestions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Supabase", "Google Gemini", "PostgreSQL"].map((t) => (
                      <TechPill key={t} label={t} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-primary" /> Delivery & Quality
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    The app is deployed on Vercel with automatic preview deployments on every
                    push. PWA configuration enables offline capability and home-screen installation.
                    Vitest covers the core logic, and the codebase is version-controlled on GitHub.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Vercel", "PWA", "Vitest", "GitHub"].map((t) => (
                      <TechPill key={t} label={t} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Development Story */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-3xl">
              <SectionHeader icon={Code} title="Development Story" />
              <div className="space-y-6">
                <div className="relative pl-6 border-l-2 border-primary/30 space-y-6">
                  <div>
                    <div className="absolute -left-[5px] mt-1 w-2 h-2 rounded-full bg-primary" />
                    <h3 className="font-display font-semibold mb-2">Prototyped in Lovable</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Inukki began as a rapid prototype in Lovable — a no-code AI builder that
                      lets you spin up a working React app through conversation. This phase was
                      about speed: validating the concept, exploring the UI, and figuring out
                      what the app actually needed to be.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-2">Migrated to a Self-Managed Codebase</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Once the idea had legs, the project was migrated into a fully self-managed
                      codebase — giving full control over the architecture, dependencies, and
                      deployment pipeline. This move from a managed platform to owning the stack
                      was a deliberate step toward a production-grade app.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-2">Built with Claude Code</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Development continues using Claude Code — Anthropic's CLI for agentic coding.
                      It enables <em>vibe coding</em> at a higher level of intentionality: describing
                      what the app should do, reviewing what's generated, and iterating quickly —
                      while staying close enough to the code to understand every decision.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-2">Ongoing</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Inukki is a living project. Features are added iteratively, informed by
                      real use. The current focus is deepening the AI layer — making style
                      recommendations more contextual and useful over time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};
