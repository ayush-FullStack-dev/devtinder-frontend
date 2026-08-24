import { AppName } from "@/constants/constants";
import { TRUSTED_APP_ORIGIN } from "@/constants/url";

const JsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: AppName,
    url: TRUSTED_APP_ORIGIN,
    description:
      "DevTinder is a developer matchmaking platform where software engineers discover, connect, and collaborate with other developers.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: AppName,
    url: TRUSTED_APP_ORIGIN,
    logo: `${TRUSTED_APP_ORIGIN}/brand/logo/logo-mark.svg`,
    description:
      "DevTinder is a developer matchmaking platform where software engineers discover, connect, and collaborate with other developers.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@devtinder.tech",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: AppName,
    url: TRUSTED_APP_ORIGIN,
    description:
      "A developer matchmaking platform with swipe-based discovery, developer profile browsing, and real-time matching for professional connections.",
    applicationCategory: "SocialNetworkingApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
];

export default JsonLd;
