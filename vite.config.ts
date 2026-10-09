import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";
import type { Plugin } from "vite";
import { componentTagger } from "lovable-tagger";

const SITE = "https://www.dzidziquist.com";
const DEFAULT_DESCRIPTION =
  "Maureen Dzifa Quist (Dzidzi) is a Business Intelligence Engineer who turns data into insights that matter and builds AI-powered tools, from analytics pipelines to LLM agents.";

interface PageMeta {
  path: string;
  title: string;
  description: string;
  image?: string;
  /** Archived projects keep their page but stay out of the sitemap. */
  hidden?: boolean;
}

/** Reads slug, title, summary, image and hidden from each entry of a data file (blogPosts.ts / portfolioProjects.ts). */
const readEntries = (file: string) => {
  const src = fs.readFileSync(path.resolve(__dirname, file), "utf8");
  const imports = Object.fromEntries(
    [...src.matchAll(/^import (\w+) from "@\/assets\/([^"]+)";/gm)].map((m) => [m[1], m[2]]),
  );
  const field = (chunk: string, name: string) => {
    const m = chunk.match(new RegExp(`\\b${name}:\\s*("(?:[^"\\\\]|\\\\.)*"|\\w+)`));
    if (!m) return undefined;
    return m[1].startsWith('"') ? (JSON.parse(m[1]) as string) : m[1];
  };
  return src
    .split(/\n {2}\{\n/)
    .slice(1)
    .map((chunk) => {
      const image = field(chunk, "image");
      return {
        slug: field(chunk, "slug"),
        title: field(chunk, "title"),
        summary: field(chunk, "excerpt") ?? field(chunk, "description"),
        image: image && (image.startsWith("/") ? image : imports[image]),
        hidden: field(chunk, "hidden") === "true",
      };
    })
    .filter((e) => e.slug && e.title);
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** GitHub Pages serves each route from a folder and redirects /about to /about/, so list the final address. */
const pageUrl = (routePath: string) => SITE + (routePath === "/" ? "/" : `${routePath}/`);

/** Swaps the title, description, canonical address and link-preview tags in the built page for this route's. */
const withMeta = (html: string, page: PageMeta, imageUrl: string) => {
  const url = pageUrl(page.path);
  const t = escapeHtml(page.title);
  const d = escapeHtml(page.description);
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${d}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${t}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${d}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:image" content=")[^"]*/, `$1${imageUrl}`)
    .replace(/(<meta property="og:type" content=")[^"]*/, `$1${page.path.split("/").length > 2 ? "article" : "website"}`);
};

/**
 * GitHub Pages only serves files that exist, so after the build write a page for every route
 * (about/index.html, blog/<slug>/index.html, ...), each with its own title, description and link preview.
 * Each address then loads directly, on refresh and from shared links. 404.html catches anything else, and
 * sitemap.xml lists every public page for search engines.
 */
const staticRoutes = (): Plugin => {
  let out = "";
  return {
    name: "static-routes",
    apply: "build",
    configResolved(config) {
      out = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const html = fs.readFileSync(path.join(out, "index.html"), "utf8");
      const built = fs.readdirSync(path.join(out, "assets"));
      // Imported images get a hashed file name in the build; find it by its original name.
      const imageUrl = (image?: string) => {
        if (!image) return `${SITE}/og-image.jpg`;
        if (image.startsWith("/")) return SITE + image;
        const base = path.basename(image).replace(/\.[^.]+$/, "");
        const file = built.find((f) => f.startsWith(base + "-"));
        return file ? `${SITE}/assets/${file}` : `${SITE}/og-image.jpg`;
      };
      const name = "Maureen Dzifa Quist";
      const pages: PageMeta[] = [
        { path: "/", title: `${name} (Dzidzi) | Business Intelligence Engineer`, description: DEFAULT_DESCRIPTION },
        {
          path: "/about",
          title: `About | ${name}`,
          description:
            "About Maureen Dzifa Quist (Dzidzi): Business Intelligence Engineer, USC Marshall alumna, former Tableau Ambassador, plant mom and sneaker lover.",
        },
        {
          path: "/portfolio",
          title: `Portfolio | ${name}`,
          description: "Dashboards, data stories and AI-powered apps by Maureen Dzifa Quist: Tableau, Python, SQL and more.",
        },
        {
          path: "/resume",
          title: `Resume | ${name}`,
          description: "Experience, education, skills and awards of Maureen Dzifa Quist, Business Intelligence Engineer.",
        },
        {
          path: "/blog",
          title: `Blog | ${name}`,
          description: "Writing on Tableau, Python, SQL, design and data insights by Maureen Dzifa Quist.",
        },
        ...readEntries("src/data/portfolioProjects.ts").map((p) => ({
          path: `/portfolio/${p.slug}`,
          title: `${p.title} | ${name}`,
          description: p.summary ?? DEFAULT_DESCRIPTION,
          image: p.image,
          hidden: p.hidden,
        })),
        ...readEntries("src/data/blogPosts.ts").map((p) => ({
          path: `/blog/${p.slug}`,
          title: `${p.title} | ${name}`,
          description: p.summary ?? DEFAULT_DESCRIPTION,
          image: p.image,
        })),
      ];
      for (const page of pages) {
        const dir = path.join(out, page.path);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, "index.html"), withMeta(html, page, imageUrl(page.image)));
      }
      fs.writeFileSync(
        path.join(out, "404.html"),
        withMeta(html, { path: "/404", title: `Page not found | ${name}`, description: DEFAULT_DESCRIPTION }, imageUrl()),
      );
      const today = new Date().toISOString().slice(0, 10);
      const urls = pages
        .filter((p) => !p.hidden)
        .map((p) => `  <url><loc>${pageUrl(p.path)}</loc><lastmod>${today}</lastmod></url>`);
      fs.writeFileSync(
        path.join(out, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
      );
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    staticRoutes(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/",
}));
