import dynamic from "next/dynamic";
import LandingPageShell from "@/sections/Landing/LandingPageShell";
import HeroSection from "@/sections/Landing/LandingHeroSection";
import { LandingCtaSection } from "./LandingCtaSection";
import LandingFooter from "./LandingFooter";

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
    const roundedTopClasses = `
        rounded-t-[15px]
        xs:rounded-t-[20px]
        sm:rounded-t-[25px]
        md:rounded-t-[32px]
        xl:rounded-t-[35px]
    `;

    const roundedClasses = `
        rounded-[15px]
        xs:rounded-[20px]
        sm:rounded-[25px]
        md:rounded-[32px]
        xl:rounded-[35px]
    `;

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
                className={`
                    ${roundedClasses}
                    relative
                    z-20
                    w-full
                    shrink-0
                    bg-fixed-white
                    overflow-hidden
                    px-4
                    py-10
                    my-5
                `}
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
                className={`
                    ${roundedClasses}
                    relative
                    z-20
                    min-h-140
                    xs:min-h-dvh
                    w-full
                    shrink-0
                    bg-fixed-white
                    overflow-hidden
                    py-5
                    my-10
                `}
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

            <div
                className={`${roundedTopClasses} relative z-30 w-full bg-fixed-white`}
            >
                <section
                    id="cta"
                    className="
                        relative
                        z-30
                        min-h-dvh
                        w-full
                        overflow-hidden
                        md:overflow-visible
                        py-10
                        shrink-0
                        text-black
                        my-10
                    "
                >
                    <LandingCtaSection />
                </section>

                <section
                    id="footer"
                    className={`${roundedTopClasses} relative z-40 w-full overflow-hidden`}
                >
                    <LandingFooter />
                </section>
            </div>
        </LandingPageShell>
    );
};

export default LandingPageContent;