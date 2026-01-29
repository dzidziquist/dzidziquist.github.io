import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowUpRight, BarChart2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects, categories, categoryIcons, getCategories } from "@/data/portfolioProjects";
const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => getCategories(p.category).includes(activeCategory));
  return <Layout>
      {/* Hero Section */}
      

      {/* Filter Section */}
      <section className="py-4 md:py-8 border-b border-border sticky top-16 md:top-20 bg-background/95 backdrop-blur-sm z-40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
            <Filter className="h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
            {categories.map(category => (
              <Button 
                key={category} 
                variant={activeCategory === category ? "default" : "outline"} 
                size="sm" 
                className="rounded-full text-xs md:text-sm h-7 md:h-9 px-2.5 md:px-4"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: -20
          }} transition={{
            duration: 0.3
          }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => {
              const projectCategories = getCategories(project.category);
              const Icon = project.icon || categoryIcons[projectCategories[0]] || BarChart2;
              return <motion.div key={project.id} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: index * 0.1
              }} className="group">
                    <Link to={`/portfolio/${project.slug}`} className="block">
                      <motion.div className="relative rounded-2xl overflow-hidden bg-card border border-border hover-lift" whileHover={{
                    scale: 1.02
                  }}>
                        {/* Image */}
                        <div className="aspect-[4/3] overflow-hidden">
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground">
                              {projectCategories.join(" • ")}
                            </span>
                          </div>

                          <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>

                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.description}
                          </p>
                        </div>

                        {/* Hover Arrow */}
                        <motion.div className="absolute top-4 right-4 p-2 rounded-full bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" whileHover={{
                      scale: 1.1
                    }}>
                          <ArrowUpRight className="h-4 w-4" />
                        </motion.div>
                      </motion.div>
                    </Link>
                  </motion.div>;
            })}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && <div className="text-center py-16 text-muted-foreground">
              No projects found in this category.
            </div>}
        </div>
      </section>
    </Layout>;
};
export default Portfolio;