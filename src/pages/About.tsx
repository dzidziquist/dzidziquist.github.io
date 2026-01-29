import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import catIllustration from "@/assets/dzidzi-illustration.png";
import profileImage from "@/assets/dzidzi-profile.png";
import { Mail, Twitter, Instagram, Linkedin, Award, BarChart3 } from "lucide-react";

const skills = ["Tableau", "Python", "SQL", "Data Visualization", "Data Analysis", "Amazon Quicksight", "Core AI/ML Skills"];

const contacts = [
  { icon: Mail, label: "Email", value: "maureendzifa.awumeequist@gmail.com", href: "mailto:maureendzifa.awumeequist@gmail.com" },
  { icon: Twitter, label: "Twitter", value: "@dzidzi_quist", href: "https://twitter.com/dzidzi_quist" },
  { icon: Instagram, label: "Instagram", value: "@dzidzi_quist", href: "https://instagram.com/dzidzi_quist" },
  { icon: Linkedin, label: "LinkedIn", value: "Maureen", href: "https://linkedin.com/in/maureen-dzifa-quist" },
  { icon: BarChart3, label: "Tableau Public", value: "Tableau Public", href: "https://public.tableau.com/app/profile/maureen.quist" },
  { icon: Award, label: "Certification", value: "Credly", href: "https://www.credly.com" },
];

const About = () => {
  const [isImageClicked, setIsImageClicked] = useState(false);

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Left Column: Profile Image */}
                <div className="flex flex-col flex-shrink-0">
                  {/* Profile Image with Interactive Border */}
                  <motion.div
                    className={`relative cursor-pointer rounded-2xl p-1 transition-colors duration-300 border-4 ${
                      isImageClicked ? "border-primary" : "border-foreground"
                    }`}
                    onClick={() => setIsImageClicked(!isImageClicked)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden">
                      <img 
                        src={profileImage} 
                        alt="Dzidzi profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* About Text */}
                <div className="flex-1 pt-2">
                  
                  <div className="space-y-3 text-muted-foreground leading-relaxed text-sm mb-5">
                    <p>
                      I am <strong className="text-foreground">Maureen Dzifa Quist (Dzidzi)</strong>, a Business Intelligence Engineer at Amazon Prime Video. I am on this AWESOME journey of being better and falling in love with working and playing with data.
                    </p>
                    <p>
                      I am a PROUD alumnus of the University of Southern California, Marshall School of Business. Before working full-time at Amazon, I worked at Amazon Prime Video as a Business Intelligence Engineer Intern for Cinematic Marketing.
                    </p>
                    <p>
                      Once upon a time, I was a data consultant working with the World Food Programme (WFP) in Kabul, Afghanistan. Prior to that, I worked with Fintech Start-ups in Accra, Ghana as data analyst, data scientist intern and data engineering intern respectively. I was also a Tableau Ambassador (2023 & 2022), a Tableau Public Featured author (2021).
                    </p>
                    <p>
                      I believe and thrive in continuous learning to expand my knowledge and skillsets in solving problems. I have come to understand and appreciate that data is powerful. <strong className="text-foreground">Let's change the world with data.</strong>
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="mb-5">
                    <h3 className="text-sm font-semibold text-foreground mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hobbies */}
                  <div className="mb-5">
                    <h3 className="text-sm font-semibold text-foreground mb-2">Hobbies & Favorites</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      My hobbies include writing poems, dancing, playing adventure video games, listening to music and going on road trips. Oh, and I have a sweet tooth for candies. 🙈 I'm crazy about Air Force 1s, Tiramisu and Boba Tea!!!
                    </p>
                  </div>

                  {/* Contact Links with Cat Illustration */}
                  <div className="flex items-end gap-4">
                  <img
                    src={catIllustration}
                    alt="Cat illustration"
                    className="w-24 h-auto object-contain"
                  />
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-2">Get in Touch</h3>
                      <div className="flex flex-wrap gap-3">
                        {contacts.map((contact) => (
                          <a
                            key={contact.label}
                            href={contact.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                          >
                            <contact.icon className="w-3.5 h-3.5" />
                            <span>{contact.value}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
