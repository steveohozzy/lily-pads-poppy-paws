import type { MetadataRoute } from "next";
import { business } from "@/lib/business";

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NODE_ENV === "production" &&
    (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production");

  if (!isProduction) {
    return {
      rules: { userAgent: "*", disallow: "/" }
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${business.domain}/sitemap.xml`,
    host: business.domain
  };
}
