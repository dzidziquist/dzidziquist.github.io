import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowLeft, ExternalLink, Calendar, Users, Wrench, Download, FileText, Code, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, getCategories } from "@/data/portfolioProjects";
import { useIsMobile } from "@/hooks/use-mobile";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Link to="/portfolio">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>
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
        <div className="absolute inset-0 animated-gradient opacity-20 bg-inherit" />
        
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection>
            {/* Back Button */}
            <Link to="/portfolio" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Project Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl overflow-hidden border border-border"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
              </motion.div>

              {/* Project Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-primary">{getCategories(project.category).join(" • ")}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  {project.title}
                </h1>

                <p className="text-lg text-muted-foreground mb-6">
                  {project.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{project.year}</span>
                  </div>
                  {project.collaborators && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>With {project.collaborators}</span>
                    </div>
                  )}
                </div>

                {/* Tools */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Wrench className="h-4 w-4" />
                    <span>Tools & Technologies</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 text-sm bg-secondary rounded-full text-secondary-foreground"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* External Link Button */}
                {project.externalLink !== "#" && (
                  <a
                    href={project.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="gap-2">
                      View on Tableau Public
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                )}
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Full Description */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-3xl">
              <h2 className="text-2xl font-display font-bold mb-6">About This Project</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {project.fullDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground mb-4 whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Embedded Document */}
      {project.pdfUrl && (
        <PdfSection pdfUrl={project.pdfUrl} title={project.title} />
      )}

      {/* Code Snippet Section */}
      {project.codeSnippet && (
        <CodeSection code={project.codeSnippet} title={project.title} />
      )}
    </Layout>
  );
};

// Separate component for PDF section to use hooks
const PdfSection = ({ pdfUrl, title }: { pdfUrl: string; title: string }) => {
  const isMobile = useIsMobile();
  const isPdf = pdfUrl.endsWith('.pdf');
  
  // On mobile/tablet, show download option instead of iframe for better UX
  if (isMobile) {
    return (
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-2xl font-display font-bold mb-6">Project Document</h2>
            <div className="rounded-2xl overflow-hidden border border-border bg-muted/30 p-8">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2">View Document</h3>
                  <p className="text-muted-foreground text-sm mb-4 max-w-sm">
                    For the best viewing experience on mobile devices, open or download the document directly.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Open Document
                    </Button>
                  </a>
                  <a
                    href={pdfUrl}
                    download
                  >
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  // Desktop view with embedded iframe
  return (
    <section className="py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold">Project Document</h2>
            <a href={pdfUrl} download>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </a>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border bg-muted/30">
            {isPdf ? (
              <iframe
                src={pdfUrl}
                className="w-full h-[600px] lg:h-[800px]"
                title={`${title} - PDF Document`}
              />
            ) : (
              <iframe
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(window.location.origin + pdfUrl)}`}
                className="w-full h-[600px] lg:h-[800px]"
                title={`${title} - Document`}
              />
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Code section component
const CodeSection = ({ code, title }: { code: string; title: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold">Python Code</h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Code
                </>
              )}
            </Button>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border bg-muted/30">
            <pre className="p-6 overflow-x-auto text-sm leading-relaxed">
              <code className="text-foreground font-mono whitespace-pre">
                {code}
              </code>
            </pre>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ProjectDetail;
