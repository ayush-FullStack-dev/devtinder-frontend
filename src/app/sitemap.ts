import { TRUSTED_APP_ORIGIN } from "@/constants/url";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/about", "/contact", "/privacy", "/login", "/signup"].map((path) => ({ url: `${TRUSTED_APP_ORIGIN}${path}`, lastModified: new Date() }));
}
