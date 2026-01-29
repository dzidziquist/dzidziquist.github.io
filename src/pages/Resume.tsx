import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Download, Briefcase, GraduationCap, Award, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
const experience = [{
  id: 1,
  role: "Business Intelligence Engineer",
  company: "Amazon Prime Video",
  location: "Seattle, WA",
  period: "Feb 2025 – Present",
  type: "work"
}, {
  id: 2,
  role: "SQL Instructional Assistant",
  company: "University of Southern California",
  location: "Los Angeles, CA",
  period: "Sep 2024 – Dec 2024",
  type: "work"
}, {
  id: 3,
  role: "Business Intelligence Engineer Intern",
  company: "Amazon Prime Video",
  location: "Seattle, WA",
  period: "Jun 2024 – Aug 2024",
  type: "work"
}, {
  id: 4,
  role: "Programme Policy Officer (Data Engineer/Analyst)",
  company: "World Food Programme",
  location: "Kabul, Afghanistan",
  period: "Apr 2021 – Jul 2023",
  type: "work"
}];
const education = [{
  id: 1,
  degree: "Master of Science in Business Analytics (STEM)",
  school: "University of Southern California, Marshall School of Business",
  location: "Los Angeles, CA",
  period: "Dec 2024",
  membership: "Business Analytics Student Association (BASA)",
  honors: "USC MSBA Fall 2023 Scholarship Award, USC Marshall MSBA Global Case Competition - Finalist (Nov 2023), Dean's List (May & Dec 2024)",
  experience: "USC Black Graduate Business Leaders - VP of Community and Events, USC MSBA Student Ambassador"
}, {
  id: 2,
  degree: "Bachelor of Arts in Economics and Statistics",
  school: "University of Ghana",
  location: "Accra, Ghana",
  period: "May 2016",
  honors: ""
}];
const certifications = [{
  name: "GIS Fundamentals (QGIS Training)",
  issuer: "QGIS"
}, {
  name: "Google Data Analytics",
  issuer: "Google"
}, {
  name: "Tableau Consumer, Author, Designer",
  issuer: "Tableau"
}];
const awards = ["Tableau Public Ambassador 2023", "Tableau Public Ambassador 2022", "Tableau Conference Gallery - Data Viz Displayed 2022 & 2020", "Tableau Featured Author 2021"];
const technologies = ["Python", "SQL", "NoSQL", "MS Excel", "Tableau", "PowerPoint", "Xlsform (ODK)", "Power BI", "Palantir", "Amazon QuickSight", "R", "Core AI/ML Skills"];
const Resume = () => {
  return <Layout>
      {/* Main Content - Responsive layout */}
      <section className="py-6 md:py-8 lg:py-12">
        <div className="container mx-auto px-4 md:px-6 h-full flex flex-col">
          {/* Top bar with Download button */}
          <div className="flex justify-end mb-4 md:mb-6">
            <Button variant="outline" size="sm" className="rounded-full border-2 border-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary text-xs md:text-sm py-1.5 px-3 md:px-4" asChild>
              <a href="/documents/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="mr-1.5 md:mr-2 h-3 w-3 md:h-3.5 md:w-3.5" />
                Download Resume
              </a>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 flex-1 lg:overflow-auto">
            {/* Left Column - Experience & Certifications */}
            <div className="space-y-5 md:space-y-6">
              {/* Experience */}
              <AnimatedSection>
                <div className="flex items-center gap-2 md:gap-2.5 mb-3 md:mb-4">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-coral flex items-center justify-center">
                    <Briefcase className="h-3.5 w-3.5 md:h-4 md:w-4 text-white" />
                  </div>
                  <h2 className="text-lg md:text-xl font-display font-bold">Relevant Experience</h2>
                </div>
                <div className="space-y-2 md:space-y-2.5">
                  {experience.filter(item => item.type === "work").map((item, index) => (
                    <motion.div 
                      key={item.id} 
                      className="p-3 md:p-3.5 rounded-lg bg-card border border-border" 
                      initial={{ opacity: 0, y: 10 }} 
                      whileInView={{ opacity: 1, y: 0 }} 
                      viewport={{ once: true }} 
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-0.5 xs:gap-0 mb-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {item.period}
                        </div>
                        <span className="text-xs text-muted-foreground">{item.location}</span>
                      </div>
                      <h3 className="font-display font-semibold text-sm">{item.role}</h3>
                      <p className="text-primary text-sm">{item.company}</p>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Certifications */}
              <AnimatedSection delay={0.1}>
                <div className="flex items-center gap-2 md:gap-2.5 mb-3 md:mb-4">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center">
                    <Award className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary-foreground" />
                  </div>
                  <h2 className="text-lg md:text-xl font-display font-bold">Certifications</h2>
                </div>
                <div className="grid gap-2 md:gap-2.5">
                  {certifications.map((cert, index) => (
                    <motion.div 
                      key={cert.name} 
                      className="p-2.5 md:p-3 rounded-lg bg-card border border-border" 
                      initial={{ opacity: 0, x: -10 }} 
                      whileInView={{ opacity: 1, x: 0 }} 
                      viewport={{ once: true }} 
                      transition={{ delay: index * 0.05 }}
                    >
                      <h3 className="font-display font-semibold text-sm">{cert.name}</h3>
                      <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Right Column - Education, Awards & Technologies */}
            <div className="space-y-5 md:space-y-6">
              {/* Education */}
              <AnimatedSection>
                <div className="flex items-center gap-2 md:gap-2.5 mb-3 md:mb-4">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/80 flex items-center justify-center">
                    <GraduationCap className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary-foreground" />
                  </div>
                  <h2 className="text-lg md:text-xl font-display font-bold">Education</h2>
                </div>
                <div className="space-y-2 md:space-y-2.5">
                  {education.map((item, index) => (
                    <motion.div 
                      key={item.id} 
                      className="p-3 md:p-3.5 rounded-lg bg-card border border-border" 
                      initial={{ opacity: 0, y: 10 }} 
                      whileInView={{ opacity: 1, y: 0 }} 
                      viewport={{ once: true }} 
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                        <Calendar className="h-3 w-3" />
                        {item.period}
                      </div>
                      <h3 className="font-display font-semibold text-sm">{item.degree}</h3>
                      <p className="text-primary text-xs md:text-sm">{item.school}</p>
                      {item.membership && (
                        <p className="text-xs text-muted-foreground mt-1.5">
                          <span className="font-medium text-foreground">Membership:</span> {item.membership}
                        </p>
                      )}
                      {item.honors && (
                        <p className="text-xs text-muted-foreground mt-1">
                          <span className="font-medium text-foreground">Honors:</span> {item.honors}
                        </p>
                      )}
                      {item.experience && (
                        <p className="text-xs text-muted-foreground mt-1">
                          <span className="font-medium text-foreground">Experience:</span> {item.experience}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Awards & Technologies Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                {/* Awards */}
                <AnimatedSection delay={0.15}>
                  <div className="flex items-center gap-2 mb-2.5 md:mb-3">
                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary/60 flex items-center justify-center">
                      <span className="text-xs md:text-sm">🏆</span>
                    </div>
                    <h2 className="text-sm md:text-base font-display font-bold">Awards</h2>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {awards.map((award, index) => (
                      <motion.span 
                        key={award} 
                        className="px-2 md:px-2.5 py-0.5 md:py-1 rounded-full bg-primary/10 text-primary text-xs font-medium" 
                        initial={{ opacity: 0, scale: 0.8 }} 
                        whileInView={{ opacity: 1, scale: 1 }} 
                        viewport={{ once: true }} 
                        transition={{ delay: index * 0.03 }}
                      >
                        {award}
                      </motion.span>
                    ))}
                  </div>
                </AnimatedSection>

                {/* Technologies */}
                <AnimatedSection delay={0.2}>
                  <div className="flex items-center gap-2 mb-2.5 md:mb-3">
                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs md:text-sm">🛠</span>
                    </div>
                    <h2 className="text-sm md:text-base font-display font-bold">Tools</h2>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {technologies.map((tech, index) => (
                      <motion.span 
                        key={tech} 
                        className="px-2 md:px-2.5 py-0.5 md:py-1 rounded-full bg-card border border-border text-xs font-medium" 
                        initial={{ opacity: 0, scale: 0.8 }} 
                        whileInView={{ opacity: 1, scale: 1 }} 
                        viewport={{ once: true }} 
                        transition={{ delay: index * 0.02 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>;
};
export default Resume;