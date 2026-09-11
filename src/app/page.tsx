import JsonLd from "@/constants/JsonLd";
import LandingNavbar from "../sections/Landing/LandingNavbar";
import HeroSection from "../sections/Landing/LandingHeroSection";
import DiscoverSection from "../sections/Landing/LandingDiscoverSection";
import { softLoginCheck } from "@/actions/softloginCheck";
import LandingHowItWorksSection from "@/sections/Landing/LandingHowItWorksSection";
import LandingWhyDevTinderSection from "@/sections/Landing/LandingWhyDevTinderSection";
import LandingFaqSection from "@/sections/Landing/LandingFaqSection";
import LandingPageContent from "@/pages/LandingPageContent";

export async function PageLayout() {
    const isLoggedIn = await softLoginCheck("refresh");

    return (
        <LandingPageContent isLoggedIn={isLoggedIn} />
    );
}

export default function HomePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(JsonLd),
                }}
            />

            <PageLayout />
        </>
    );
}