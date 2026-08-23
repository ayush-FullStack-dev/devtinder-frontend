import { TRUSTED_APP_ORIGIN } from "@/constants/url";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${TRUSTED_APP_ORIGIN}/sitemap.xml` };
}
