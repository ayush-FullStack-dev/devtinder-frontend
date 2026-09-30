import dynamic from "next/dynamic";
import LandingPageShell from "@/sections/Landing/LandingPageShell";
import HeroSection from "@/sections/Landing/LandingHeroSection";
import { LandingCtaSection } from "./LandingCtaSection";

const DiscoverSection = dynamic(
    () => import("@/sections/Landing/LandingDiscoverSection"),
    { ssr: true }
);

const LandingHowItWorksSection = dynamic(
    () => import("@/sections/Landing/LandingHowItWorksSection"),
    { ssr: true }
);

const LandingWhyDevTinderSection = dynamic(
    () => import("@/sections/Landing/LandingWhyDevTinderSection"),
    { ssr: true }
);

const LandingFaqSection = dynamic(
    () => import("@/sections/Landing/LandingFaqSection"),
    { ssr: true }
);

type LandingPageContentProps = {
    isLoggedIn: boolean;
};

const LandingPageContent = ({ isLoggedIn }: LandingPageContentProps) => {
    return (
        <LandingPageShell>
            <section
                id="home"
                className="
                    relative
                    z-10
                    w-full
                    shrink-0
                    mb-30
                "
            >
                <HeroSection />
            </section>

            <section
                id="discover"
                className="
                    relative
                    z-20
                    w-full
                    shrink-0
                    bg-fixed-white
                    overflow-hidden
                    rounded-4xl
                    px-4
                    py-10
                    my-5
                "
            >
                <DiscoverSection isLoggedIn={isLoggedIn} />
            </section>

            <section
                id="how-it-works"
                className="
                    relative
                    z-70
                    min-h-dvh
                    w-full
                    shrink-0
                    my-10
                "
            >
                <LandingHowItWorksSection />
            </section>

            <section
                id="why-devtinder"
                className="
                    relative
                    z-20
                    min-h-140
                    xs:min-h-dvh
                    w-full
                    shrink-0
                    bg-fixed-white
                    overflow-hidden
                    xs:rounded-4xl
                    py-5
                    my-10
                "
            >
                <LandingWhyDevTinderSection />
            </section>

            <section
                id="frequently-asked-questions"
                className="
                    relative
                    z-30
                    min-h-dvh
                    w-full
                    shrink-0
                    text-fixed-white
                    my-10
                "
            >
                <LandingFaqSection />
            </section>

            <section
                id="frequently-asked-questions"
                className="
                    relative
                    z-30
                    min-h-dvh
                    w-full
                    bg-white
                  
                    shrink-0
                    text-black
                    my-10
                "
            >
                <LandingCtaSection  />
            </section>
        </LandingPageShell>
    );
};

export default LandingPageContent;
