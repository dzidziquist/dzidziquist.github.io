import { motion } from "framer-motion";
import { ArrowUpRight, BarChart2, PieChart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "Sales Performance Dashboard",
    description: "Interactive Tableau dashboard tracking KPIs across regions with drill-down capabilities.",
    category: "Tableau",
    icon: BarChart2,
    color: "bg-coral/10 text-coral",
    gradient: "from-coral/20 to-peach/20",
  },
  {
    id: 2,
    title: "Customer Segmentation Analysis",
    description: "Data-driven customer segments using Python clustering for targeted marketing strategies.",
    category: "Python",
    icon: PieChart,
    color: "bg-mint/20 text-accent-foreground",
    gradient: "from-mint/20 to-lavender/20",
  },
  {
    id: 3,
    title: "Financial Trends Visualization",
    description: "Executive-level financial reporting with interactive forecasting and trend analysis.",
    category: "Data Viz",
    icon: TrendingUp,
    color: "bg-lavender/20 text-secondary-foreground",
    gradient: "from-lavender/20 to-soft-pink/20",
  },
];

export const FeaturedProjects = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="text-sm font-medium text-primary mb-2 block">Featured Work</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Selected Projects
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-full self-start md:self-auto">
              <Link to="/portfolio">
                View All Projects
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 0.1}>
              <motion.div
                className={`group relative h-full p-6 rounded-2xl bg-gradient-to-br ${project.gradient} border border-border/50 hover-lift cursor-pointer overflow-hidden`}
                whileHover={{ scale: 1.02 }}
              >
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl ${project.color} mb-4`}>
                  <project.icon className="h-6 w-6" />
                </div>

                {/* Category Tag */}
                <span className="inline-block px-3 py-1 rounded-full bg-background/80 text-xs font-medium mb-3">
                  {project.category}
                </span>

                {/* Content */}
                <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Arrow */}
                <motion.div
                  className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -10, y: 10 }}
                  whileHover={{ x: 0, y: 0 }}
                >
                  <ArrowUpRight className="h-5 w-5 text-primary" />
                </motion.div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
