import JsonLd from "@/constants/JsonLd";
import Navbar from "../sections/Landing/LandingNavbar";
import HeroSection from "../sections/Landing/LandingHeroSection";
import DiscoverSection from "../sections/Landing/LandingDiscoverSection";

export function PageLayout() {
    return (
        <main
            id="main-scroll"
            className="
                relative
                flex
                h-dvh
                w-full
                flex-col
                overflow-x-hidden
                overflow-y-auto
                bg-background
                scrollbar-hide
                overscroll-contain
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
                    shrink-0
                    scroll-mt-24
                "
            >
                <DiscoverSection />
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