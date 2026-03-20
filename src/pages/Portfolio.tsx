import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowUpRight, BarChart2, Filter, LucideIcon } from "lucide-react";
import { FilterButton } from "@/components/ui/FilterButton";
import { Button } from "@/components/ui/button";
import { projects, categories, categoryIcons, getCategories } from "@/data/portfolioProjects";
import { useRandomColor } from "@/hooks/use-random-color";

const PortfolioCard = ({ project, index, projectCategories, Icon }: { project: typeof projects[number]; index: number; projectCategories: string[]; Icon: LucideIcon }) => {
  const color = useRandomColor();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/portfolio/${project.slug}`} className="block">
        <div className="brutal-card overflow-hidden transition-all duration-300"
          style={{
            borderColor: hovered ? color.accent : undefined,
            boxShadow: hovered ? `4px 4px 0px ${color.accent}` : undefined,
          }}
        >
          <div className="aspect-[4/3] overflow-hidden border-b border-foreground"
            style={{ borderColor: hovered ? color.accent : undefined }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="p-1.5 border border-foreground"
                style={{
                  backgroundColor: hovered ? `${color.accent}20` : undefined,
                  borderColor: hovered ? color.accent : undefined,
                  boxShadow: hovered ? 'var(--brutal-shadow)' : 'var(--brutal-shadow-sm)',
                  transform: hovered ? 'translate(-1px, -1px)' : undefined,
                  transition: 'box-shadow 0.1s ease, transform 0.1s ease, background-color 0.3s, border-color 0.3s',
                }}
              >
                <Icon className="h-3.5 w-3.5 transition-colors duration-300" style={{ color: hovered ? color.accent : undefined }} />
              </div>
              <span className="mono-label text-muted-foreground">
                {projectCategories.join(" • ")}
              </span>
            </div>

            <h3 className="text-base font-display font-bold mb-2 transition-colors duration-300" style={{ textTransform: 'none', color: hovered ? color.accent : undefined }}>
              {project.title}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2" style={{ textTransform: 'none' }}>
              {project.description}
            </p>
          </div>

          <div className="absolute top-3 right-3 p-2 text-primary-foreground border border-foreground opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ backgroundColor: color.accent, color: color.fg, boxShadow: 'var(--brutal-shadow-sm)' }}
          >
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => getCategories(p.category).includes(activeCategory));

  return (
    <Layout>
      <section className="py-4 md:py-6 border-b border-foreground sticky top-16 md:top-[57px] bg-background z-40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
            <span className="mono-label text-muted-foreground flex-shrink-0 flex items-center gap-1">
              <Filter className="h-3.5 w-3.5" />
              Filter:
            </span>
            {categories.map(category => (
              <FilterButton
                key={category}
                label={category}
                isActive={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, index) => {
                const projectCategories = getCategories(project.category);
                const Icon = project.icon || categoryIcons[projectCategories[0]] || BarChart2;
                return (
                  <PortfolioCard key={project.id} project={project} index={index} projectCategories={projectCategories} Icon={Icon} />
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16 text-muted-foreground mono-label">
              No projects found in this category.
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
