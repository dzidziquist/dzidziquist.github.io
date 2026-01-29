import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Clock, ArrowRight, Search, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { blogPosts, categories, categoryColors } from "@/data/blogPosts";
const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPosts = blogPosts.filter(post => activeCategory === "All" || post.category === activeCategory).filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
  return <Layout>
      {/* All Posts with Filter */}
      <section className="py-16">
        <div className="container mx-auto px-6">

          {/* Search and Filter */}
          <AnimatedSection>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search articles..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 rounded-full" />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                <Tag className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                {categories.map(category => <Button key={category} variant={activeCategory === category ? "default" : "outline"} size="sm" className="rounded-full whitespace-nowrap" onClick={() => setActiveCategory(category)}>
                    {category}
                  </Button>)}
              </div>
            </div>
          </AnimatedSection>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => <AnimatedSection key={post.id} delay={index * 0.1}>
                <motion.article className="group h-full flex flex-col p-6 rounded-2xl bg-card border border-border hover-lift" whileHover={{
              scale: 1.02
            }}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[post.category]}`}>
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
                      Read
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </motion.article>
              </AnimatedSection>)}
          </div>

          {filteredPosts.length === 0 && <div className="text-center py-16 text-muted-foreground">
              No articles found matching your criteria.
            </div>}
        </div>
      </section>
    </Layout>;
};
export default Blog;