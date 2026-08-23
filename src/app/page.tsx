import JsonLd from "@/constants/JsonLd";
import Navbar from "../sections/Landing/LandingNavbar";
import HeroSection from "../sections/Landing/LandingHeroSection";
import DiscoverSection from "../sections/Landing/LandingDiscoverSection";

export function PageLayout() {
  return <main id="main-scroll" className="relative flex h-dvh w-full flex-col overflow-x-hidden overflow-y-auto scroll-smooth bg-background scrollbar-hide gap-30 overscroll-contain"><Navbar /><section id="home" className="relative min-h-dvh w-full shrink-0"><HeroSection /></section><section id="discover" className="relative w-full shrink-0 scroll-mt-24"><DiscoverSection /></section></main>;
}

export default function HomePage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JsonLd) }} /><PageLayout /><section className="sr-only" aria-label="About DevTinder"><h1>DevTinder is a developer networking platform</h1><p>DevTinder helps software developers discover other developers, explore professional profiles, and build meaningful connections around shared technical interests. It is designed for people working in software and technology who want to expand their network, meet peers, learn from other builders, and discover collaborators with complementary skills. Public information about DevTinder is available without signing in so visitors, search engines, and AI agents can understand what the product does before recommending it. Create an account when you want to manage your profile and use account-based networking features.</p><nav aria-label="Public information"><a href="/about">About DevTinder</a><a href="/contact">Contact DevTinder</a><a href="/privacy">Privacy</a><a href="/llms.txt">Agent instructions</a><a href="/sitemap.xml">Sitemap</a></nav></section></>;
}
