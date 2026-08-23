import { AppName } from "@/constants/constants";
import { TRUSTED_APP_ORIGIN } from "@/constants/url";

const JsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", name: AppName, description: "DevTinder is a developer networking platform for discovering developers and building professional connections.", url: TRUSTED_APP_ORIGIN },
    { "@type": "Organization", name: AppName, description: "A developer networking platform focused on discovering developers and creating professional connections.", url: TRUSTED_APP_ORIGIN, logo: `${TRUSTED_APP_ORIGIN}/brand/logo/logo-mark.svg`, contactPoint: { "@type": "ContactPoint", contactType: "customer support", url: `${TRUSTED_APP_ORIGIN}/contact` }, address: { "@type": "PostalAddress", addressCountry: "IN" } },
    { "@type": "SoftwareApplication", name: AppName, description: "A web application for developer discovery and professional networking.", url: TRUSTED_APP_ORIGIN, applicationCategory: "SocialNetworkingApplication", operatingSystem: "Web" }
  ]
};

export default JsonLd;
