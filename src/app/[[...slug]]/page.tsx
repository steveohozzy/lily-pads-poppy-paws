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

const pageSeo: Record<string, { title: string; description: string }> = {
  home: {
    title: "Dog Grooming in Hemel Hempstead | Lily Pads & Poppy Paws",
    description: "Looking for a dog groomer in Hemel Hempstead? Lily Pads & Poppy Paws is qualified and insured, offering nail clips to full grooms for all breeds. Call to enquire."
  },
  about: {
    title: "About Lily Pads & Poppy Paws | Hemel Hempstead Dog Groomer",
    description: "Meet Lily Pads & Poppy Paws, a qualified and insured dog grooming business in Hemel Hempstead, Hertfordshire. All breeds welcome."
  },
  services: {
    title: "Dog Grooming Services | Hemel Hempstead | Lily Pads & Poppy Paws",
    description: "Explore dog grooming in Hemel Hempstead, from nail clipping to full grooms for all breeds. Contact Lily Pads & Poppy Paws to discuss your dog's needs and prices."
  },
  gallery: {
    title: "Dog Grooming Gallery | Lily Pads & Poppy Paws",
    description: "See the Lily Pads & Poppy Paws dog grooming gallery. Follow our latest updates and lovely four-legged visitors in Hemel Hempstead."
  },
  faqs: {
    title: "Dog Grooming FAQs | Hemel Hempstead | Lily Pads & Poppy Paws",
    description: "Answers to common questions about dog grooming, services, prices and appointments at Lily Pads & Poppy Paws in Hemel Hempstead."
  },
  contact: {
    title: "Contact a Dog Groomer in Hemel Hempstead | Lily Pads & Poppy Paws",
    description: "Contact Lily Pads & Poppy Paws for dog grooming enquiries, prices and appointments. Find us at 42 Lomond Road, Hemel Hempstead, HP2 6PA."
  },
  privacy: {
    title: "Privacy Policy | Lily Pads & Poppy Paws",
    description: "Read the privacy information for the Lily Pads & Poppy Paws website."
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const path = slug?.join("/") || "home";
  const story = await fetchStory(path);
  const content = story?.content || {};
  const fallback = pageSeo[path] || {
    title: `${path.charAt(0).toUpperCase()}${path.slice(1)} | Lily Pads & Poppy Paws`,
    description: "Qualified and insured dog groomer in Hemel Hempstead. Contact Lily Pads & Poppy Paws to discuss dog grooming services, prices and appointments."
  };
  const pageTitle = content.seo_title || content.title || fallback.title;
  const description = content.seo_description || fallback.description;
  const canonical = `${business.domain}${path === "home" ? "" : `/${path}`}`;
  return {
    title: { absolute: pageTitle },
    description,
    alternates: { canonical },
    openGraph: {
      title: pageTitle,
      description,
      url: canonical,
      siteName: business.name,
      locale: "en_GB",
      type: "website",
      images: [{ url: "/images/2.jpeg", width: 1000, height: 1000, alt: "Lily Pads & Poppy Paws dog grooming in Hemel Hempstead" }]
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: ["/images/2.jpeg"]
    }
  };
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
