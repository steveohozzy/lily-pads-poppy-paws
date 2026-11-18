import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import Page from "@/components/storyblok/Page";
import Hero from "@/components/storyblok/Hero";
import TextSection from "@/components/storyblok/TextSection";
import ServiceGrid from "@/components/storyblok/ServiceGrid";
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
    faq_list: FaqList,
    gallery_grid: GalleryGrid,
    call_to_action: CallToAction,
    service_item: ServiceItem
  }
});
