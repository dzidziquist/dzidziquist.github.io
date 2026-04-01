import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { blogPosts, categoryColors } from "@/data/blogPosts";
import { useRandomColor } from "@/hooks/use-random-color";

const HoverImage = ({ src, alt, className = "mb-10" }: { src: string; alt: string; className?: string }) => {
  const color = useRandomColor();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`border border-foreground overflow-hidden transition-all duration-300 ${className}`}
      style={{
        boxShadow: hovered ? `4px 4px 0px ${color.accent}` : 'var(--brutal-shadow)',
        borderColor: hovered ? color.accent : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={src} alt={alt} className="w-full h-auto" />
    </div>
  );
};

const HoverCodeBlock = ({ code }: { code: string }) => {
  const color = useRandomColor();
  const [hovered, setHovered] = useState(false);

  return (
    <pre
      className="brutal-card p-4 overflow-x-auto my-6 transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? color.accent : undefined,
        boxShadow: hovered ? `4px 4px 0px ${color.accent}` : undefined,
      }}
    >
      <code className="text-sm font-mono text-foreground whitespace-pre-wrap break-words">{code}</code>
    </pre>
  );
};

const RelatedPostCard = ({ post }: { post: typeof blogPosts[number] }) => {
  const color = useRandomColor();
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="brutal-card p-4 transition-all duration-300 block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? color.accent : undefined,
        boxShadow: hovered ? `4px 4px 0px ${color.accent}` : undefined,
      }}
    >
      <span
        className="brutal-tag mb-2 inline-block transition-colors duration-300"
        style={{
          textTransform: 'none',
          backgroundColor: hovered ? `${color.accent}20` : undefined,
          color: hovered ? color.accent : undefined,
        }}
      >
        {post.category}
      </span>
      <h4
        className="font-bold line-clamp-2 transition-colors duration-300"
        style={{ textTransform: 'none', color: hovered ? color.accent : undefined }}
      >
        {post.title}
      </h4>
    </Link>
  );
};

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.slug === id || p.id === Number(id));

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Post not found</h1>
          <Link to="/blog">
            <button className="brutal-btn bg-primary text-primary-foreground px-6 py-3 flex items-center gap-2 mx-auto">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="py-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimatedSection>
            {/* Back Link */}
            <Link to="/blog" className="inline-flex items-center gap-2 mono-label text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="brutal-tag bg-primary/10 text-primary">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 mono-label text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-display font-bold mb-4" style={{ textTransform: 'none' }}>
                {post.title}
              </h1>
              <div className="flex items-center gap-4 mono-label text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {post.date}
                </span>
              </div>
            </header>

            {/* Featured Image */}
            {post.image && <HoverImage src={post.image} alt={post.title} />}

            {/* Content */}
            <div className="max-w-none" style={{ textTransform: 'none' }}>
              {(() => {
                const codeBlocks: string[] = [];
                let contentWithPlaceholders = post.content.replace(/```[\s\S]*?```/g, match => {
                  codeBlocks.push(match);
                  return `___CODE_BLOCK_${codeBlocks.length - 1}___`;
                });

                const paragraphs = contentWithPlaceholders.split('\n\n');
                return paragraphs.map((paragraph, index) => {
                  const codeBlockMatch = paragraph.match(/___CODE_BLOCK_(\d+)___/);
                  if (codeBlockMatch) {
                    const codeBlockIndex = parseInt(codeBlockMatch[1]);
                    const codeBlock = codeBlocks[codeBlockIndex];
                    const lines = codeBlock.split('\n');
                    const codeLines = lines.slice(1);
                    const code = codeLines[codeLines.length - 1] === '```' ? codeLines.slice(0, -1).join('\n') : codeLines.join('\n');
                    return <HoverCodeBlock key={index} code={code} />;
                  }
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={index} className="text-xl font-display font-bold mt-10 mb-4 border-b border-foreground pb-2">{paragraph.replace('## ', '')}</h2>;
                  }
                  if (paragraph.startsWith('### ')) {
                    return <h3 key={index} className="text-lg font-display font-semibold mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
                  }
                  if (paragraph.startsWith('![')) {
                    const match = paragraph.match(/!\[(.*?)\]\((.*?)\)/);
                    if (match) {
                      const [, alt, src] = match;
                      if (post.image && src === post.image) return null;
                      return <HoverImage key={index} src={src} alt={alt} className="my-6" />;
                    }
                  }
                  if (paragraph.includes('<iframe')) {
                    const srcMatch = paragraph.match(/src="([^"]+)"/);
                    if (srcMatch) {
                      const heightMatch = paragraph.match(/height="([^"]+)"/);
                      const heightStyle = heightMatch
                        ? { border: 'none', height: `${heightMatch[1]}px`, width: '100%', display: 'block' }
                        : { border: 'none', width: '100%', display: 'block' };
                      const iframeClass = heightMatch ? "" : "aspect-video";
                      return (
                        <div
                          key={index}
                          className="my-6 brutal-card overflow-hidden"
                          style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)' }}
                        >
                          <iframe src={srcMatch[1]} className={iframeClass} style={heightStyle} allowFullScreen />
                        </div>
                      );
                    }
                  }

                  const formatText = (text: string) => {
                    return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-bold">$1</strong>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-bold">$1</a>');
                  };

                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                    return (
                      <ul key={index} className="pl-5 my-4 space-y-2">
                        {items.map((item, i) => (
                          <li key={i} className="text-muted-foreground text-sm leading-relaxed relative before:content-['→'] before:absolute before:-left-5 before:text-primary before:font-bold" dangerouslySetInnerHTML={{ __html: formatText(item.replace('- ', '')) }} />
                        ))}
                      </ul>
                    );
                  }
                  if (paragraph.match(/^\d+\./)) {
                    const items = paragraph.split('\n').filter(line => line.match(/^\d+\./));
                    return (
                      <ol key={index} className="pl-6 my-4 space-y-2">
                        {items.map((item, i) => (
                          <li key={i} className="text-muted-foreground text-sm leading-relaxed list-decimal marker:text-primary marker:font-bold" dangerouslySetInnerHTML={{ __html: formatText(item.replace(/^\d+\.\s*/, '')) }} />
                        ))}
                      </ol>
                    );
                  }
                  return <p key={index} className="text-muted-foreground text-sm leading-relaxed my-4" dangerouslySetInnerHTML={{ __html: formatText(paragraph) }} />;
                });
              })()}
            </div>

            {/* Related Posts */}
            <div className="mt-12 pt-6 border-t border-foreground">
              <h3 className="text-lg font-display font-bold mb-4">More Articles</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {blogPosts.filter(p => p.id !== post.id).slice(0, 2).map(relatedPost => (
                  <RelatedPostCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
