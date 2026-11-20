import type { MetadataRoute } from "next";
import { business } from "@/lib/business";
import { getStoryblokApi } from "@/lib/storyblok";

const fallbackRoutes = ["/", "/about", "/services", "/gallery", "/faqs", "/contact", "/privacy"];
const PAGE_SIZE = 100;

type StoryblokPage = {
  full_slug?: string;
  slug?: string;
  published_at?: string;
  first_published_at?: string;
  is_folder?: boolean;
  content?: { component?: string };
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = business.domain.replace(/\/$/, "");

  try {
    const api = getStoryblokApi();
    const stories: StoryblokPage[] = [];
    let page = 1;

    // Fetch every page of published Storyblok content, not just the first 100 stories.
    while (true) {
      const response = await api.get("cdn/stories", {
        version: "published",
        per_page: PAGE_SIZE,
        page
      });

      const batch: StoryblokPage[] = response.data.stories || [];
      stories.push(...batch);

      if (batch.length < PAGE_SIZE) break;
      page += 1;
    }

    const pages = stories.filter((story) =>
      !story.is_folder &&
      story.content?.component === "page" &&
      (story.full_slug || story.slug)
    );

    if (!pages.length) throw new Error("No published Storyblok pages returned");

    const urls = new Map<string, MetadataRoute.Sitemap[number]>();

    for (const story of pages) {
      const slug = (story.full_slug || story.slug || "").replace(/^\/+|\/+$/g, "");
      const route = !slug || slug === "home" ? "/" : `/${slug}`;

      // Avoid duplicate URLs if Storyblok returns the same page more than once.
      urls.set(route, {
        url: `${base}${route}`,
        lastModified: story.published_at || story.first_published_at
          ? new Date(story.published_at || story.first_published_at!)
          : new Date(),
        changeFrequency: route === "/" ? "weekly" : "monthly",
        priority: route === "/" ? 1 : route === "/services" || route === "/contact" ? 0.9 : 0.7
      });
    }

    return Array.from(urls.values()).sort((a, b) => a.url.localeCompare(b.url));
  } catch {
    // Keep a useful sitemap available if Storyblok is temporarily unavailable.
    return fallbackRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "/" ? "weekly" : "monthly",
      priority: route === "/" ? 1 : route === "/services" || route === "/contact" ? 0.9 : 0.7
    }));
  }
}
