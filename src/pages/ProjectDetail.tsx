import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowLeft, ExternalLink, Calendar, Users, Wrench, Download, FileText, Code, Copy, Check } from "lucide-react";
import { InukkiCaseStudy } from "@/components/portfolio/InukkiCaseStudy";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, getCategories, getCtaLabel } from "@/data/portfolioProjects";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRandomColor } from "@/hooks/use-random-color";

const ProjectHeroImage = ({ project }: { project: any }) => {
  const color = useRandomColor();
  const [hovered, setHovered] = useState(false);

  const content = project.externalLink && project.externalLink !== "#" ? (
    <a href={project.externalLink} target="_blank" rel="noopener noreferrer">
      <img src={project.image} alt={project.title} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
    </a>
  ) : (
    <img src={project.image} alt={project.title} className="w-full h-auto object-cover" />
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
      onMouseLeave={() => setHovered(false)}
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
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? color.accent : undefined,
        backgroundColor: hovered ? `${color.accent}20` : undefined,
        color: hovered ? color.accent : undefined,
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
      onMouseLeave={() => setHovered(false)}
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

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

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
                  <div className="p-2 border border-foreground bg-primary/10" style={{ boxShadow: 'var(--brutal-shadow-sm)' }}>
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="mono-label text-primary">{getCategories(project.category).join(" • ")}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-display font-bold mb-4" style={{ textTransform: 'none' }}>
                  {project.title}
                </h1>

                <p className="text-lg text-muted-foreground mb-6" style={{ textTransform: 'none' }}>
                  {project.description}
                </p>

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

                {/* External Link */}
                {project.externalLink !== "#" && (
                  <a href={project.externalLink} target="_blank" rel="noopener noreferrer">
                    <HoverButton className="bg-primary text-primary-foreground px-6 py-3 flex items-center gap-2">
                      {getCtaLabel(project)}
                      <ExternalLink className="h-4 w-4" />
                    </HoverButton>
                  </a>
                )}
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Case Study or Description */}
      {project.customCaseStudy && project.slug === "inukki" ? (
        <>
          <section className="py-16 border-t border-foreground">
            <div className="container mx-auto px-6">
              <AnimatedSection>
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-display font-bold mb-6">About This Project</h2>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {project.fullDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground mb-4 whitespace-pre-line" style={{ textTransform: 'none' }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
          <InukkiCaseStudy />
        </>
      ) : (
        <>
          <section className="py-16 border-t border-foreground">
            <div className="container mx-auto px-6">
              <AnimatedSection>
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-display font-bold mb-6">About This Project</h2>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {project.fullDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground mb-4 whitespace-pre-line" style={{ textTransform: 'none' }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
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
      <section className="py-16 border-t border-foreground">
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
    <section className="py-16 border-t border-foreground">
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
      onMouseLeave={() => setHovered(false)}
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
    <section className="py-16 border-t border-foreground">
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
