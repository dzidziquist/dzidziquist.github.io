import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, FolderOpen, Home, User, BookOpen, ScrollText } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type Entry = { label: string; path: string; detail?: string };

const PAGES = [
  { label: "Home", path: "/", icon: Home },
  { label: "About", path: "/about", icon: User },
  { label: "Portfolio", path: "/portfolio", icon: FolderOpen },
  { label: "Resume", path: "/resume", icon: ScrollText },
  { label: "Blog", path: "/blog", icon: BookOpen },
];

/** ⌘K / Ctrl+K search: jump to any page, project or blog post. Projects and posts load only when it opens. */
export const CommandMenu = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Entry[]>([]);
  const [posts, setPosts] = useState<Entry[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open || projects.length) return;
    import("@/data/portfolioProjects").then((m) =>
      setProjects(m.projects.map((p) => ({ label: p.title, path: `/portfolio/${p.slug}`, detail: m.getCategories(p.category).join(" · ") }))),
    );
    import("@/data/blogPosts").then((m) =>
      setPosts(m.blogPosts.map((p) => ({ label: p.title, path: `/blog/${p.slug}`, detail: p.category }))),
    );
  }, [open, projects.length]);

  const go = (path: string) => {
    onOpenChange(false);
    navigate(path);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search pages, projects and posts…" />
      <CommandList className="max-h-[60vh]">
        <CommandEmpty>Nothing matches that. Try “tableau” or “python”.</CommandEmpty>
        <CommandGroup heading="Pages">
          {PAGES.map((p) => (
            <CommandItem key={p.path} value={`page ${p.label}`} onSelect={() => go(p.path)}>
              <p.icon className="mr-2" aria-hidden />
              {p.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Projects">
          {projects.map((p) => (
            <CommandItem key={p.path} value={`${p.label} ${p.detail}`} onSelect={() => go(p.path)}>
              <FolderOpen className="mr-2" aria-hidden />
              <span className="flex-1 truncate">{p.label}</span>
              <span className="ml-3 mono-label text-muted-foreground hidden sm:inline">{p.detail}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Blog">
          {posts.map((p) => (
            <CommandItem key={p.path} value={`${p.label} ${p.detail}`} onSelect={() => go(p.path)}>
              <FileText className="mr-2" aria-hidden />
              <span className="flex-1 truncate">{p.label}</span>
              <span className="ml-3 mono-label text-muted-foreground hidden sm:inline">{p.detail}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
