import { TRUSTED_APP_ORIGIN } from "@/constants/url";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${TRUSTED_APP_ORIGIN}/`,
      lastModified: new Date(),
    },
    {
      url: `${TRUSTED_APP_ORIGIN}/login`,
      lastModified: new Date(),
    },
    {
      url: `${TRUSTED_APP_ORIGIN}/signup`,
      lastModified: new Date(),
    },
  ];
}
