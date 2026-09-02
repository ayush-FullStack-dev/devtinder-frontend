import JsonLd from "@/constants/JsonLd";
import Navbar from "../sections/Landing/LandingNavbar";
import HeroSection from "../sections/Landing/LandingHeroSection";
import DiscoverSection from "../sections/Landing/LandingDiscoverSection";
import { softLoginCheck } from "@/actions/softloginCheck";
import LandingHowItWorksSection from "@/sections/Landing/LandingHowItWorksSection";
import LandingWhyDevTinderSection from "@/sections/Landing/LandingWhyDevTinderSection";

export async function PageLayout() {
    const isLoggedIn = await softLoginCheck("refresh");

    return (
        <main
            id="main-scroll"
            className="
                relative
                flex
                h-dvh
                w-full
                flex-col
                gap-25
                overflow-x-hidden
                overflow-y-auto
                bg-background
                scrollbar-hide
                lg:gap-30
            "
        >
            <Navbar />

            <section
                id="home"
                className="
                    relative
                    min-h-dvh
                    w-full
                    shrink-0
                "
            >
                <HeroSection />
            </section>

            <section
                id="discover"
                className="
                    relative
                    w-full
                    min-h-dvh
                    shrink-0
                    py-10
                "
            >
                <DiscoverSection isLoggedIn={isLoggedIn} />
            </section>

            <section
                id="how-it-works"
                className="
                    relative
                    w-full
                    min-h-dvh
                    shrink-0
                    pb-10
                "
            >
                <LandingHowItWorksSection />
            </section>
            <section
                id="why-devtinder"
                className="
                    relative
                    min-h-dvh
                    w-full
                    shrink-0
                    py-10
                "
            >
                <LandingWhyDevTinderSection />
            </section>
        </main>
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