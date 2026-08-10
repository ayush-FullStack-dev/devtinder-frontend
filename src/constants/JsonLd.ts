import { AppName } from "@/constants/constants";
import { TRUSTED_APP_ORIGIN } from "@/constants/url";

const JsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: AppName,
    url: TRUSTED_APP_ORIGIN,
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: AppName,
    url: TRUSTED_APP_ORIGIN,
    logo: `${TRUSTED_APP_ORIGIN}/brand/logo/logo-mark.svg`,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: AppName,
    url: TRUSTED_APP_ORIGIN,
    applicationCategory: "SocialNetworkingApplication",
    operatingSystem: "Web",
  },
];

export default JsonLd;
