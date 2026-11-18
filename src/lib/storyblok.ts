import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import Page from "@/components/storyblok/Page";
import Hero from "@/components/storyblok/Hero";
import TextSection from "@/components/storyblok/TextSection";
import ServiceGrid from "@/components/storyblok/ServiceGrid";
import GroomingPickerBlock from "@/components/storyblok/GroomingPickerBlock";
import TrustRibbon from "@/components/storyblok/TrustRibbon";
import StoryblokCallout from "@/components/storyblok/StoryblokCallout";
import FaqList from "@/components/storyblok/FaqList";
import GalleryGrid from "@/components/storyblok/GalleryGrid";
import CallToAction from "@/components/storyblok/CallToAction";
import ServiceItem from "@/components/storyblok/ServiceItem";

// Preview tokens are used for local development and draft content only.
// The public token is used by the live site for published content.
const accessToken =
  process.env.NODE_ENV === "development"
    ? process.env.STORYBLOK_PREVIEW_TOKEN || process.env.STORYBLOK_PUBLIC_TOKEN
    : process.env.STORYBLOK_PUBLIC_TOKEN;

export const getStoryblokApi = storyblokInit({
  accessToken,
  use: [apiPlugin],
  apiOptions: { region: "eu" },
  components: {
    page: Page,
    hero: Hero,
    text_section: TextSection,
    service_grid: ServiceGrid,
    grooming_picker: GroomingPickerBlock,
    trust_ribbon: TrustRibbon,
    faq_list: FaqList,
    gallery_grid: GalleryGrid,
    call_to_action: CallToAction,
    callout: StoryblokCallout,
    service_item: ServiceItem
  }
});


export async function getSiteSettings() {
  if (!accessToken) return null;

  try {
    const api = getStoryblokApi();
    const version = process.env.NODE_ENV === "development" && process.env.STORYBLOK_PREVIEW_TOKEN
      ? "draft"
      : "published";
    const response = await api.get("cdn/stories/site-settings", { version, cv: Date.now() });
    return response.data.story?.content || null;
  } catch {
    return null;
  }
}
