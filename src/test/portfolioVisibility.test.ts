import { describe, it, expect } from "vitest";
import { projects, allProjects, getProjectBySlug, getCtaLabel } from "@/data/portfolioProjects";

const ARCHIVED = ["inukki", "brickdex"];
const VISIBLE = ["reelfeel", "thyve"];

describe("portfolio visibility", () => {
  it("keeps archived projects out of listings", () => {
    const listed = projects.map((p) => p.slug);
    for (const slug of ARCHIVED) {
      expect(listed).not.toContain(slug);
    }
  });

  it("keeps archived projects in the dataset, not deleted", () => {
    const all = allProjects.map((p) => p.slug);
    for (const slug of ARCHIVED) {
      expect(all).toContain(slug);
    }
  });

  it("still resolves archived projects by direct slug lookup", () => {
    for (const slug of ARCHIVED) {
      expect(getProjectBySlug(slug)?.slug).toBe(slug);
    }
  });

  it("lists the projects that should be public", () => {
    const listed = projects.map((p) => p.slug);
    for (const slug of VISIBLE) {
      expect(listed).toContain(slug);
    }
  });

  it("exposes only unhidden projects in the listing export", () => {
    expect(projects.every((p) => !p.hidden)).toBe(true);
    expect(allProjects.length - projects.length).toBe(ARCHIVED.length);
  });

  it("has no duplicate ids or slugs", () => {
    expect(new Set(allProjects.map((p) => p.id)).size).toBe(allProjects.length);
    expect(new Set(allProjects.map((p) => p.slug)).size).toBe(allProjects.length);
  });

  it("labels each call-to-action for where the link actually points", () => {
    expect(getCtaLabel(getProjectBySlug("reelfeel")!)).toBe("Visit reelfeel.me");
    expect(getCtaLabel(getProjectBySlug("brickdex")!)).toBe("View App");
    expect(getCtaLabel(getProjectBySlug("gender-inequality-parliament")!)).toBe(
      "View on Tableau Public",
    );
  });

  it("renders no primary CTA for a project with no public link yet", () => {
    expect(getProjectBySlug("thyve")!.externalLink).toBe("#");
  });

  it("claims no public App Store listing for a TestFlight-only build", () => {
    const reelfeel = getProjectBySlug("reelfeel")!;
    expect(reelfeel.externalLink).toBe("https://reelfeel.me");
    expect(reelfeel.fullDescription).not.toContain("App Store");
    expect(reelfeel.description).not.toContain("App Store");
  });
});
