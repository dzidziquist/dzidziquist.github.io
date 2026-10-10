import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowLeft, ExternalLink, Calendar, Users, Wrench, Download, FileText, Code, Copy, Check } from "lucide-react";
import { InukkiCaseStudy } from "@/components/portfolio/InukkiCaseStudy";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, getCategories, getCtaLabel, type Project } from "@/data/portfolioProjects";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRandomColor } from "@/hooks/use-random-color";
import { useDocumentTitle } from "@/hooks/use-document-title";

const ProjectHeroImage = ({ project }: { project: any }) => {
  const color = useRandomColor();
  const [hovered, setHovered] = useState(false);
  const [failed, setFailed] = useState(false);

  // Hide the frame instead of showing a broken image box
  if (!project.image || failed) return null;

  const content = project.externalLink && project.externalLink !== "#" ? (
    <a href={project.externalLink} target="_blank" rel="noopener noreferrer">
      <img src={project.image} alt={project.title} onError={() => setFailed(true)} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
    </a>
  ) : (
    <img src={project.image} alt={project.title} onError={() => setFailed(true)} className="w-full h-auto object-cover" />
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="border border-foreground overflow-hidden w-64 mx-auto lg:mx-0 flex-shrink-0 bg-card transition-all duration-300"
      style={{
        boxShadow: hovered ? `4px 4px 0px ${color.accent}` : 'var(--brutal-shadow)',
        borderColor: hovered ? color.accent : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onFocus={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onBlur={() => setHovered(false)}
    >
      {content}
    </motion.div>
  );
};

const HoverTag = ({ label }: { label: string }) => {
  const color = useRandomColor();
  const [hovered, setHovered] = useState(false);
  return (
    <span
      className="brutal-tag transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onFocus={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onBlur={() => setHovered(false)}
      style={{
        borderColor: hovered ? color.accent : undefined,
        backgroundColor: hovered ? color.accent : undefined,
        color: hovered ? color.fg : undefined,
      }}
    >
      {label}
    </span>
  );
};

const HoverButton = ({ children, className = "", style = {}, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) => {
  const color = useRandomColor();
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className={`brutal-btn transition-all duration-300 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onFocus={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onBlur={() => setHovered(false)}
      style={{
        ...(hovered ? { backgroundColor: color.accent, color: color.fg, borderColor: color.accent, boxShadow: `3px 3px 0px ${color.accent}40` } : {}),
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

/** Case-study summary: key numbers, then question, approach, finding and recommendation. */
// Renders plain-text descriptions: a short first line ending in ":" becomes a
// subheading (unless it is a lead-in like "This visualization explores:"), and
// blocks of "- " or "1. " lines become lists.
const LIST_ITEM = /^(?:-|\d+\.)\s+/;
const LEAD_IN = /\b(?:explores|includes?|analyzes|features|constitutes)$/i;

const ListItemText = ({ text }: { text: string }) => {
  const match = text.match(/^([^:]{2,48}):\s+(.+)$/);
  if (!match) return <>{text}</>;
  return (
    <>
      <span className="font-semibold text-foreground">{match[1]}:</span> {match[2]}
    </>
  );
};

// Splits lines into runs of plain text and runs of list items, so a block can mix both.
const groupLines = (lines: string[]) =>
  lines.reduce<{ list: boolean; lines: string[] }[]>((groups, line) => {
    const list = LIST_ITEM.test(line);
    const last = groups[groups.length - 1];
    if (last && last.list === list) last.lines.push(line);
    else groups.push({ list, lines: [line] });
    return groups;
  }, []);

const FormattedDescription = ({ text }: { text: string }) => (
  <div className="space-y-6 text-lg leading-relaxed" style={{ textTransform: "none" }}>
    {text.split("\n\n").map((block, index) => {
      let lines = block.split("\n");
      const label = lines.length > 1 && lines[0].endsWith(":") && lines[0].length <= 60 ? lines[0].slice(0, -1) : null;
      const heading = label && !LEAD_IN.test(label) ? label : null;
      if (heading) lines = lines.slice(1);
      return (
        <div key={index} className="space-y-2">
          {heading && <h3 className="mono-label text-primary">{heading}</h3>}
          {groupLines(lines).map((group, i) => {
            if (!group.list) {
              return (
                <p key={i} className="text-muted-foreground whitespace-pre-line">
                  {group.lines.join("\n")}
                </p>
              );
            }
            const ordered = /^\d/.test(group.lines[0]);
            const List = ordered ? "ol" : "ul";
            return (
              <List key={i} className={`${ordered ? "list-decimal" : "list-disc"} pl-6 space-y-1.5 text-muted-foreground marker:text-primary`}>
                {group.lines.map((line, j) => (
                  <li key={j}>
                    <ListItemText text={line.replace(LIST_ITEM, "")} />
                  </li>
                ))}
              </List>
            );
          })}
        </div>
      );
    })}
  </div>
);

const GLANCE_COLUMNS = ["lg:grid-cols-1", "lg:grid-cols-2", "lg:grid-cols-3", "lg:grid-cols-4"];

const AtAGlance = ({ summary }: { summary: NonNullable<Project["atAGlance"]> }) => {
  const stats = summary.stats ?? [];
  const entries = (
    [
      ["The question", summary.question],
      ["What I did", summary.approach],
      ["What I found", summary.finding],
      ["What it shows", summary.shows],
      ["What I recommended", summary.recommendation],
    ] as const
  ).filter(([, text]) => text);

  return (
    <AnimatedSection>
      <section aria-labelledby="at-a-glance" className="mt-14">
        <h2 id="at-a-glance" className="text-xl md:text-2xl font-display font-bold mb-6">At a glance</h2>
        {stats.length > 0 && (
          <div className={`grid grid-cols-2 ${GLANCE_COLUMNS[Math.min(stats.length, 4) - 1]} gap-4 ${entries.length ? "mb-8" : ""}`}>
            {stats.map((s, i) => (
              <div
                key={s.label}
                // An odd last tile fills the row on the two-column phone grid
                className={`brutal-card p-4 ${stats.length % 2 && i === stats.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="text-2xl md:text-3xl font-display font-bold text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground" style={{ textTransform: "none" }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}
        {entries.length > 0 && (
          <dl className={`grid gap-x-10 gap-y-6 ${entries.length > 1 ? "md:grid-cols-2" : "max-w-3xl"}`}>
            {entries.map(([label, text]) => (
              <div key={label}>
                <dt className="mono-label text-primary mb-1.5">{label}</dt>
                <dd className="text-foreground leading-relaxed" style={{ textTransform: "none" }}>{text}</dd>
              </div>
            ))}
          </dl>
        )}
      </section>
    </AnimatedSection>
  );
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  useDocumentTitle(project?.title ?? "Project not found");

  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8" style={{ textTransform: 'none' }}>The project you're looking for doesn't exist.</p>
          <Link to="/portfolio">
            <HoverButton className="bg-primary text-primary-foreground px-6 py-3">
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </HoverButton>
          </Link>
        </div>
      </Layout>
    );
  }

  const Icon = project.icon;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection>
            {/* Back Button */}
            <Link to="/portfolio" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 mono-label">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Link>

            <div className="grid lg:grid-cols-[auto_1fr] gap-12 items-start">
              {/* Project Image */}
              <ProjectHeroImage project={project} />

              {/* Project Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="group p-2 border border-foreground bg-primary/10 cursor-default transition-all duration-200 shadow-[var(--brutal-shadow-sm)] hover:bg-primary hover:-translate-x-0.5 hover:-translate-y-0.5 hover:-rotate-6 hover:shadow-[var(--brutal-shadow)]">
                    <Icon className="h-5 w-5 text-primary transition-colors duration-200 group-hover:text-primary-foreground" />
                  </div>
                  <span className="mono-label text-primary">{getCategories(project.category).join(" • ")}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-display font-bold mb-4" style={{ textTransform: 'none' }}>
                  {project.title}
                </h1>

                <p className="text-lg text-muted-foreground mb-6" style={{ textTransform: 'none' }}>
                  {project.description}
                </p>

                {project.impact && (
                  <p className="mb-6 text-base font-semibold text-foreground" style={{ textTransform: 'none' }}>
                    <span className="mono-label text-primary mr-2">Result</span>
                    {project.impact}
                  </p>
                )}

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 mono-label text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{project.year}</span>
                  </div>
                  {project.collaborators && (
                    <div className="flex items-center gap-2 mono-label text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>With {project.collaborators}</span>
                    </div>
                  )}
                </div>

                {/* Tools */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mono-label text-muted-foreground mb-3">
                    <Wrench className="h-4 w-4" />
                    <span>Tools & Technologies</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <HoverTag key={tool} label={tool} />
                    ))}
                  </div>
                </div>

                {/* External Links */}
                {(project.externalLink !== "#" || project.secondaryLink) && (
                  <div className="flex flex-wrap gap-3">
                    {project.externalLink !== "#" && (
                      <a href={project.externalLink} target="_blank" rel="noopener noreferrer">
                        <HoverButton className="bg-primary text-primary-foreground px-6 py-3 flex items-center gap-2">
                          {getCtaLabel(project)}
                          <ExternalLink className="h-4 w-4" />
                        </HoverButton>
                      </a>
                    )}
                    {project.secondaryLink && (
                      <a href={project.secondaryLink.url} target="_blank" rel="noopener noreferrer">
                        <HoverButton className="bg-background text-foreground px-6 py-3 flex items-center gap-2">
                          {project.secondaryLink.label}
                          <ExternalLink className="h-4 w-4" />
                        </HoverButton>
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </AnimatedSection>

          {project.atAGlance && <AtAGlance summary={project.atAGlance} />}
        </div>
      </section>

      {/* Case Study or Description */}
      {project.customCaseStudy && project.slug === "inukki" ? (
        <>
          <section className="py-16">
            <div className="container mx-auto px-6">
              <AnimatedSection>
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-display font-bold mb-6">About This Project</h2>
                  <FormattedDescription text={project.fullDescription} />
                </div>
              </AnimatedSection>
            </div>
          </section>
          <InukkiCaseStudy />
        </>
      ) : (
        <>
          <section className="py-16">
            <div className="container mx-auto px-6">
              <AnimatedSection>
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-display font-bold mb-6">{project.atAGlance ? "The details" : "About This Project"}</h2>
                  <FormattedDescription text={project.fullDescription} />
                </div>
              </AnimatedSection>
            </div>
          </section>

          {project.pdfUrl && <PdfSection pdfUrl={project.pdfUrl} title={project.title} />}
          {project.codeSnippet && <CodeSection code={project.codeSnippet} title={project.title} />}
        </>
      )}
    </Layout>
  );
};

const PdfSection = ({ pdfUrl, title }: { pdfUrl: string; title: string }) => {
  const isMobile = useIsMobile();
  const isPdf = pdfUrl.endsWith('.pdf');
  
  if (isMobile) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-2xl font-display font-bold mb-6">Project Document</h2>
            <div className="brutal-card p-8">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 border border-foreground bg-primary/10 flex items-center justify-center" style={{ boxShadow: 'var(--brutal-shadow-sm)' }}>
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-2">View Document</h3>
                  <p className="text-muted-foreground text-sm mb-4 max-w-sm" style={{ textTransform: 'none' }}>
                    For the best viewing experience on mobile, open or download the document directly.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                    <HoverButton className="bg-primary text-primary-foreground px-4 py-2 flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Open Document
                    </HoverButton>
                  </a>
                  <a href={pdfUrl} download>
                    <HoverButton className="bg-card px-4 py-2 flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </HoverButton>
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold">Project Document</h2>
            <a href={pdfUrl} download>
              <HoverButton className="bg-card px-4 py-2 flex items-center gap-2 text-sm">
                <Download className="h-4 w-4" />
                Download
              </HoverButton>
            </a>
          </div>
          <div className="brutal-card overflow-hidden">
            {isPdf ? (
              <object data={pdfUrl} type="application/pdf" className="w-full h-[600px] lg:h-[800px]" title={`${title} - PDF Document`}>
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4" style={{ textTransform: 'none' }}>Unable to display PDF inline.</p>
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                    <HoverButton className="bg-primary text-primary-foreground px-4 py-2">
                      <ExternalLink className="h-4 w-4" />
                      Open PDF
                    </HoverButton>
                  </a>
                </div>
              </object>
            ) : (
              <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(window.location.origin + pdfUrl)}`} className="w-full h-[600px] lg:h-[800px]" title={`${title} - Document`} />
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

const CodeBlockHover = ({ code, handleCopy, copied }: { code: string; handleCopy: () => void; copied: boolean }) => {
  const color = useRandomColor();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="brutal-card overflow-hidden transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onFocus={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onBlur={() => setHovered(false)}
      style={{
        borderColor: hovered ? color.accent : undefined,
        boxShadow: hovered ? `4px 4px 0px ${color.accent}` : undefined,
      }}
    >
      <pre className="p-6 overflow-x-auto text-sm leading-relaxed">
        <code className="text-foreground font-mono whitespace-pre" style={{ textTransform: 'none' }}>
          {code}
        </code>
      </pre>
    </div>
  );
};

const CodeSection = ({ code, title }: { code: string; title: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 border border-foreground bg-primary/10" style={{ boxShadow: 'var(--brutal-shadow-sm)' }}>
                <Code className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold">Python Code</h2>
            </div>
            <HoverButton className="bg-card px-4 py-2 flex items-center gap-2 text-sm" onClick={handleCopy}>
              {copied ? <><Check className="h-4 w-4" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy Code</>}
            </HoverButton>
          </div>
          <CodeBlockHover code={code} handleCopy={handleCopy} copied={copied} />
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ProjectDetail;
