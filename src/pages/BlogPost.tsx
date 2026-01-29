import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts, categoryColors } from "@/data/blogPosts";
const BlogPost = () => {
  const {
    id
  } = useParams();
  const post = blogPosts.find(p => p.slug === id || p.id === Number(id));
  if (!post) {
    return <Layout>
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Post not found</h1>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </Layout>;
  }
  return <Layout>
      <article className="py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimatedSection>
            {/* Back Link */}
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {/* Header */}
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[post.category]}`}>
                  {post.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-6">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
            </header>

            {/* Featured Image */}
            {post.image && <div className="mb-10 rounded-xl overflow-hidden border border-border">
                <img src={post.image} alt={post.title} className="w-full h-auto" />
              </div>}

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {(() => {
              // First, extract code blocks and replace them with placeholders
              const codeBlocks: string[] = [];
              let contentWithPlaceholders = post.content.replace(/```[\s\S]*?```/g, match => {
                codeBlocks.push(match);
                return `___CODE_BLOCK_${codeBlocks.length - 1}___`;
              });

              // Now split by double newlines
              const paragraphs = contentWithPlaceholders.split('\n\n');
              return paragraphs.map((paragraph, index) => {
                // Check if this is a code block placeholder
                const codeBlockMatch = paragraph.match(/___CODE_BLOCK_(\d+)___/);
                if (codeBlockMatch) {
                  const codeBlockIndex = parseInt(codeBlockMatch[1]);
                  const codeBlock = codeBlocks[codeBlockIndex];
                  const lines = codeBlock.split('\n');
                  // Skip the first line (```language) and get all lines until closing ```
                  const codeLines = lines.slice(1);
                  // Remove the closing ``` if it's the last line
                  const code = codeLines[codeLines.length - 1] === '```' ? codeLines.slice(0, -1).join('\n') : codeLines.join('\n');
                  return <pre key={index} className="bg-muted p-4 rounded-lg overflow-x-auto my-6 border border-border">
                        <code className="text-sm font-mono text-foreground whitespace-pre-wrap break-words">{code}</code>
                      </pre>;
                }
                if (paragraph.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-display font-bold mt-8 mb-4">
                          {paragraph.replace('## ', '')}
                        </h2>;
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={index} className="text-xl font-display font-semibold mt-6 mb-3">
                          {paragraph.replace('### ', '')}
                        </h3>;
                }
                // Handle images with markdown syntax ![alt](src)
                if (paragraph.startsWith('![')) {
                  const match = paragraph.match(/!\[(.*?)\]\((.*?)\)/);
                  if (match) {
                    const [, alt, src] = match;
                    return <div key={index} className="my-6 rounded-xl overflow-hidden border border-border">
                            
                          </div>;
                  }
                }
                // Handle iframe embeds
                if (paragraph.includes('<iframe')) {
                  const srcMatch = paragraph.match(/src="([^"]+)"/);
                  if (srcMatch) {
                    return <div key={index} className="my-6 rounded-xl overflow-hidden border border-border">
                            <iframe src={srcMatch[1]} className="w-full aspect-video" style={{
                        border: '1px solid rgba(0, 0, 0, 0.1)'
                      }} allowFullScreen />
                          </div>;
                  }
                }
                // Helper function to format text with bold and links
                const formatText = (text: string) => {
                  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>');
                };
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                  return <ul key={index} className="list-disc pl-6 my-4 space-y-2">
                          {items.map((item, i) => <li key={i} className="text-muted-foreground" dangerouslySetInnerHTML={{
                      __html: formatText(item.replace('- ', ''))
                    }} />)}
                        </ul>;
                }
                if (paragraph.match(/^\d+\./)) {
                  const items = paragraph.split('\n').filter(line => line.match(/^\d+\./));
                  return <ol key={index} className="list-decimal pl-6 my-4 space-y-2">
                          {items.map((item, i) => <li key={i} className="text-muted-foreground" dangerouslySetInnerHTML={{
                      __html: formatText(item.replace(/^\d+\.\s*/, ''))
                    }} />)}
                        </ol>;
                }
                // Handle bold text, links, and regular paragraphs
                return <p key={index} className="text-muted-foreground leading-relaxed my-4" dangerouslySetInnerHTML={{
                  __html: formatText(paragraph)
                }} />;
              });
            })()}
            </div>

            {/* Navigation to other posts */}
            <div className="mt-16 pt-8 border-t border-border">
              <h3 className="text-lg font-display font-semibold mb-4">More Articles</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {blogPosts.filter(p => p.id !== post.id).slice(0, 2).map(relatedPost => <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`} className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${categoryColors[relatedPost.category]}`}>
                        {relatedPost.category}
                      </span>
                      <h4 className="font-medium line-clamp-2">{relatedPost.title}</h4>
                    </Link>)}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </article>
    </Layout>;
};
export default BlogPost;