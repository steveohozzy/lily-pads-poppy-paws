import type { MetadataRoute } from "next";
import { business } from "@/lib/business";
import { getStoryblokApi } from "@/lib/storyblok";

const fallbackRoutes = ["", "/about", "/services", "/gallery", "/faqs", "/contact", "/privacy"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = business.domain;
  try {
    const api = getStoryblokApi();
    const response = await api.get("cdn/stories", { version: "published", per_page: 100 });
    const stories = (response.data.stories || []).filter((story: { content?: { component?: string }; is_folder?: boolean }) =>
      !story.is_folder && story.content?.component === "page"
    );
    if (!stories.length) throw new Error("No published Storyblok pages returned");

    return stories.map((story: { full_slug: string; slug: string; published_at?: string }) => {
      const path = story.full_slug === "home" || story.slug === "home" ? "" : story.full_slug;
      const route = path ? `/${path}` : "/";
      return {
        url: `${base}${route}`,
        lastModified: story.published_at ? new Date(story.published_at) : new Date(),
        changeFrequency: route === "/" ? "weekly" : "monthly",
        priority: route === "/" ? 1 : route === "/services" || route === "/contact" ? 0.9 : 0.7
      };
    });
  } catch {
    return fallbackRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : route === "/services" || route === "/contact" ? 0.9 : 0.7
    }));
  }
}
