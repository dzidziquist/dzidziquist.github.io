import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Download, Briefcase, GraduationCap, Award, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRandomColor } from "@/hooks/use-random-color";

const experience = [{
  id: 1, role: "Business Intelligence Engineer", company: "Amazon Prime Video", location: "Seattle, WA", period: "Feb 2025 – Present", type: "work"
}, {
  id: 2, role: "SQL Instructional Assistant", company: "University of Southern California", location: "Los Angeles, CA", period: "Sep 2024 – Dec 2024", type: "work"
}, {
  id: 3, role: "Business Intelligence Engineer Intern", company: "Amazon Prime Video", location: "Seattle, WA", period: "Jun 2024 – Aug 2024", type: "work"
}, {
  id: 4, role: "Programme Policy Officer (Data Engineer/Analyst)", company: "World Food Programme", location: "Kabul, Afghanistan", period: "Apr 2021 – Jul 2023", type: "work"
}];

const education = [{
  id: 1, degree: "Master of Science in Business Analytics (STEM)", school: "University of Southern California, Marshall School of Business", location: "Los Angeles, CA", period: "Dec 2024", membership: "Business Analytics Student Association (BASA)", honors: "USC MSBA Fall 2023 Scholarship Award, USC Marshall MSBA Global Case Competition - Finalist (Nov 2023), Dean's List (May & Dec 2024)", experience: "USC Black Graduate Business Leaders - VP of Community and Events, USC MSBA Student Ambassador"
}, {
  id: 2, degree: "Bachelor of Arts in Economics and Statistics", school: "University of Ghana", location: "Accra, Ghana", period: "May 2016", honors: ""
}];

const certifications = [
  { name: "GIS Fundamentals (QGIS Training)", issuer: "QGIS" },
  { name: "Google Data Analytics", issuer: "Google" },
  { name: "Tableau Consumer, Author, Designer", issuer: "Tableau" },
];

const awards = ["Tableau Public Ambassador 2023", "Tableau Public Ambassador 2022", "Tableau Conference Gallery - Data Viz Displayed 2022 & 2020", "Tableau Featured Author 2021"];
const technologies = ["Python", "SQL", "NoSQL", "MS Excel", "Tableau", "PowerPoint", "Xlsform (ODK)", "Power BI", "Palantir", "Amazon QuickSight", "R", "Core AI/ML Skills", "AWS", "Redshift"];

const ResumeCard = ({ children, index = 0, animateFrom = "y" }: { children: React.ReactNode; index?: number; animateFrom?: "x" | "y" }) => {
  const color = useRandomColor();
  const [hovered, setHovered] = useState(false);
  const initial = animateFrom === "x" ? { opacity: 0, x: -10 } : { opacity: 0, y: 10 };
  const animate = animateFrom === "x" ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 };

  return (
    <motion.div
      className="brutal-card transition-all duration-300"
      initial={initial}
      whileInView={animate}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? color.accent : undefined,
        boxShadow: hovered ? `4px 4px 0px ${color.accent}` : undefined,
      }}
    >
      {children}
    </motion.div>
  );
};

const ResumeTag = ({ label, index = 0 }: { label: string; index?: number }) => {
  const color = useRandomColor();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.span
      className="brutal-tag transition-all duration-300 cursor-default"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textTransform: 'none',
        backgroundColor: hovered ? color.accent : undefined,
        color: hovered ? color.fg : undefined,
        borderColor: hovered ? color.accent : undefined,
      }}
    >
      {label}
    </motion.span>
  );
};

const Resume = () => {
  const downloadColor = useRandomColor();
  const [downloadHovered, setDownloadHovered] = useState(false);

  return (
    <Layout>
      <section className="py-6 md:py-8 lg:py-12">
        <div className="container mx-auto px-4 md:px-6 h-full flex flex-col">
          {/* Top bar */}
          <div className="flex justify-end mb-4 md:mb-6">
            <a href="/documents/resume.pdf?v=2026-08" target="_blank" rel="noopener noreferrer">
              <button
                className="brutal-btn bg-card px-4 py-2 flex items-center gap-2 text-xs md:text-sm transition-all duration-300"
                style={{
                  backgroundColor: downloadHovered ? downloadColor.accent : undefined,
                  color: downloadHovered ? downloadColor.fg : undefined,
                  boxShadow: downloadHovered ? `4px 4px 0px ${downloadColor.accent}55` : undefined,
                }}
                onMouseEnter={() => setDownloadHovered(true)}
                onMouseLeave={() => setDownloadHovered(false)}
              >
                <Download className="h-3.5 w-3.5" />
                Download Resume
              </button>
            </a>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 flex-1 lg:overflow-auto">
            {/* Left Column */}
            <div className="space-y-5 md:space-y-6">
              {/* Experience */}
              <AnimatedSection>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 border border-foreground bg-coral flex items-center justify-center" style={{ boxShadow: 'var(--brutal-shadow-sm)' }}>
                    <Briefcase className="h-4 w-4 text-foreground" />
                  </div>
                  <h2 className="text-lg md:text-xl font-display font-bold">Relevant Experience</h2>
                </div>
                <div className="space-y-2.5">
                  {experience.filter(item => item.type === "work").map((item, index) => (
                    <ResumeCard key={item.id} index={index}>
                      <div className="p-3.5">
                        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-0.5 mb-1">
                          <div className="flex items-center gap-1.5 mono-label text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {item.period}
                          </div>
                          <span className="mono-label text-muted-foreground">{item.location}</span>
                        </div>
                        <h3 className="font-display font-bold text-sm" style={{ textTransform: 'none' }}>{item.role}</h3>
                        <p className="text-primary text-sm font-medium" style={{ textTransform: 'none' }}>{item.company}</p>
                      </div>
                    </ResumeCard>
                  ))}
                </div>
              </AnimatedSection>

              {/* Certifications */}
              <AnimatedSection delay={0.1}>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 border border-foreground bg-primary flex items-center justify-center" style={{ boxShadow: 'var(--brutal-shadow-sm)' }}>
                    <Award className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <h2 className="text-lg md:text-xl font-display font-bold">Certifications</h2>
                </div>
                <div className="grid gap-2.5 pb-1">
                  {certifications.map((cert, index) => (
                    <ResumeCard key={cert.name} index={index} animateFrom="x">
                      <div className="p-3">
                        <h3 className="font-display font-bold text-sm" style={{ textTransform: 'none' }}>{cert.name}</h3>
                        <p className="mono-label text-muted-foreground">{cert.issuer}</p>
                      </div>
                    </ResumeCard>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Right Column */}
            <div className="space-y-5 md:space-y-6">
              {/* Education */}
              <AnimatedSection>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 border border-foreground bg-lavender flex items-center justify-center" style={{ boxShadow: 'var(--brutal-shadow-sm)' }}>
                    <GraduationCap className="h-4 w-4 text-foreground" />
                  </div>
                  <h2 className="text-lg md:text-xl font-display font-bold">Education</h2>
                </div>
                <div className="space-y-2.5">
                  {education.map((item, index) => (
                    <ResumeCard key={item.id} index={index}>
                      <div className="p-3.5">
                        <div className="flex items-center gap-1.5 mono-label text-muted-foreground mb-1">
                          <Calendar className="h-3 w-3" />
                          {item.period}
                        </div>
                        <h3 className="font-display font-bold text-sm" style={{ textTransform: 'none' }}>{item.degree}</h3>
                        <p className="text-primary text-xs md:text-sm font-medium" style={{ textTransform: 'none' }}>{item.school}</p>
                        {item.membership && (
                          <p className="text-xs text-muted-foreground mt-1.5" style={{ textTransform: 'none' }}>
                            <span className="font-bold text-foreground">Membership:</span> {item.membership}
                          </p>
                        )}
                        {item.honors && (
                          <p className="text-xs text-muted-foreground mt-1" style={{ textTransform: 'none' }}>
                            <span className="font-bold text-foreground">Honors:</span> {item.honors}
                          </p>
                        )}
                        {item.experience && (
                          <p className="text-xs text-muted-foreground mt-1" style={{ textTransform: 'none' }}>
                            <span className="font-bold text-foreground">Experience:</span> {item.experience}
                          </p>
                        )}
                      </div>
                    </ResumeCard>
                  ))}
                </div>
              </AnimatedSection>

              {/* Awards & Technologies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                <AnimatedSection delay={0.15}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 border border-foreground bg-peach flex items-center justify-center" style={{ boxShadow: 'var(--brutal-shadow-sm)' }}>
                      <span className="text-xs">🏆</span>
                    </div>
                    <h2 className="text-sm md:text-base font-display font-bold">Awards</h2>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {awards.map((award, index) => (
                      <ResumeTag key={award} label={award} index={index} />
                    ))}
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 border border-foreground bg-mint flex items-center justify-center" style={{ boxShadow: 'var(--brutal-shadow-sm)' }}>
                      <span className="text-xs">🛠</span>
                    </div>
                    <h2 className="text-sm md:text-base font-display font-bold">Tools</h2>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {technologies.map((tech, index) => (
                      <ResumeTag key={tech} label={tech} index={index} />
                    ))}
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Resume;
