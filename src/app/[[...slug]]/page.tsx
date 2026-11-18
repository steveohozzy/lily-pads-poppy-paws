import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/lib/storyblok";
import { business } from "@/lib/business";
import { HomeFallback, AboutFallback, ServicesFallback, GalleryFallback, FaqsFallback, ContactFallback, PrivacyFallback } from "../fallback-pages";

const fallbackPages: Record<string, React.ComponentType> = {
  home: HomeFallback, about: AboutFallback, services: ServicesFallback, gallery: GalleryFallback, faqs: FaqsFallback, contact: ContactFallback, privacy: PrivacyFallback
};

async function fetchStory(slug: string) {
  // Never use a Preview token on the public production site. It can read
  // unpublished stories, so production requires the Public token.
  const isDevelopment = process.env.NODE_ENV === "development";
  const token = isDevelopment
    ? process.env.STORYBLOK_PREVIEW_TOKEN || process.env.STORYBLOK_PUBLIC_TOKEN
    : process.env.STORYBLOK_PUBLIC_TOKEN;
  if (!token) return null;
  try {
    const api = getStoryblokApi();
    const version = isDevelopment && process.env.STORYBLOK_PREVIEW_TOKEN ? "draft" : "published";
    const response = await api.get(`cdn/stories/${slug}`, { version, cv: Date.now() });
    return response.data.story;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const path = slug?.join("/") || "home";
  const story = await fetchStory(path);
  const content = story?.content || {};
  const pageTitle = content.seo_title || content.title || (path === "home" ? "Dog Groomers in Hemel Hempstead" : `${path.charAt(0).toUpperCase()}${path.slice(1)} | Dog Grooming`);
  const description = content.seo_description || "Qualified and insured dog groomer in Hemel Hempstead. From nail clips to full grooms for all breeds. Call Lily Pads & Poppy Paws to enquire.";
  return { title: pageTitle, description, alternates: { canonical: `${business.domain}${path === "home" ? "" : `/${path}`}` }, openGraph: { title: pageTitle, description, url: `${business.domain}${path === "home" ? "" : `/${path}`}`, siteName: business.name, locale: "en_GB", type: "website" } };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const path = slug?.join("/") || "home";
  const story = await fetchStory(path);
  if (story) return <StoryblokStory story={story} />;
  const Fallback = fallbackPages[path];
  if (!Fallback) notFound();
  return <Fallback />;
}
