import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Clock, ArrowRight, Search, Tag } from "lucide-react";
import { FilterButton } from "@/components/ui/FilterButton";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { blogPosts, categories, categoryColors } from "@/data/blogPosts";
import { useRandomColor } from "@/hooks/use-random-color";

const BlogCard = ({ post }: { post: typeof blogPosts[number] }) => {
  const color = useRandomColor();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      className="group h-full flex flex-col brutal-card p-5 transition-all duration-300"
      whileHover={{ scale: 1.01 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? color.accent : undefined,
        boxShadow: hovered ? `4px 4px 0px ${color.accent}` : undefined,
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="brutal-tag transition-colors duration-300"
          style={{
            backgroundColor: hovered ? `${color.accent}20` : undefined,
            color: hovered ? color.accent : undefined,
          }}
        >
          {post.category}
        </span>
        <span className="flex items-center gap-1 mono-label text-muted-foreground">
          <Clock className="h-3 w-3" />
          {post.readTime}
        </span>
      </div>

      <h3 className="text-base font-display font-bold mb-2 transition-colors duration-300 line-clamp-2" style={{ textTransform: 'none', color: hovered ? color.accent : undefined }}>
        {post.title}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3" style={{ textTransform: 'none' }}>
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between pt-4 border-t transition-colors duration-300"
        style={{ borderColor: hovered ? color.accent : undefined }}
      >
        <span className="mono-label text-muted-foreground">{post.date}</span>
        <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-sm font-bold hover:gap-2 transition-all uppercase"
          style={{ color: hovered ? color.accent : undefined }}
        >
          Read
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </motion.article>
  );
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPosts = blogPosts
    .filter(post => activeCategory === "All" || post.category === activeCategory)
    .filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-6">
          {/* Search and Filter */}
          <AnimatedSection>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10 border border-foreground bg-card"
                  style={{ boxShadow: 'var(--brutal-shadow-sm)' }}
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                <span className="mono-label text-muted-foreground flex-shrink-0 flex items-center gap-1">
                  <Tag className="h-3.5 w-3.5" />
                  Tags:
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
          </AnimatedSection>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <AnimatedSection key={post.id} delay={index * 0.08}>
                <BlogCard post={post} />
              </AnimatedSection>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16 text-muted-foreground mono-label">
              No articles found matching your criteria.
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
