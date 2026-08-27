import type { Metadata } from "next";

import { AppName } from "@/constants/constants";
import { TRUSTED_APP_ORIGIN } from "@/constants/url";
import {
    googleSans,
    googleSansFlex,
} from "@/assets/fonts/font.google";

export const metadata: Metadata = {
    title: `How ${AppName} Works — Connect & Collaborate with Developers`,
    description:
        "See how DevTinder helps developers discover, connect, and collaborate with other developers through developer matchmaking.",
    alternates: {
        canonical: "/how-it-works",
    },
    openGraph: {
        type: "video.other",
        title: `How ${AppName} Works`,
        description:
            "See how DevTinder helps developers discover, connect, and collaborate with other developers.",
        url: `${TRUSTED_APP_ORIGIN}/how-it-works`,
        images: [
            {
                url: `${TRUSTED_APP_ORIGIN}/brand/social/og-image.png`,
                width: 1200,
                height: 630,
                alt: `How ${AppName} Works`,
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
    },
};

const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "How DevTinder Works",
    description:
        "See how DevTinder helps developers discover, connect, and collaborate with other developers through developer matchmaking.",
    thumbnailUrl: [
        `${TRUSTED_APP_ORIGIN}/brand/social/og-image.png`,
    ],
    uploadDate: "2026-08-27T00:00:00+05:30",
    contentUrl: `${TRUSTED_APP_ORIGIN}/videos/LandingHowItWorks.mp4`,
    embedUrl: `${TRUSTED_APP_ORIGIN}/how-it-works`,
    publisher: {
        "@type": "Organization",
        name: AppName,
        url: TRUSTED_APP_ORIGIN,
        logo: {
            "@type": "ImageObject",
            url: `${TRUSTED_APP_ORIGIN}/brand/logo/logo-mark.svg`,
        },
    },
};

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-background text-foreground">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(videoJsonLd),
                }}
            />

            <header className="mx-auto flex h-20 w-full max-w-7xl items-center px-6 sm:px-8 lg:px-12">
                <a
                    href="/"
                    className={`${googleSans.className} group inline-flex items-center gap-2 text-sm font-medium tracking-tight transition-opacity duration-200 hover:opacity-60`}
                >
                    <span className="text-base leading-none transition-transform duration-300 group-hover:-translate-x-1">
                        ←
                    </span>

                    <span>{AppName}</span>
                </a>
            </header>

            <section className="mx-auto w-full max-w-7xl px-6 pb-28 pt-24 sm:px-8 sm:pb-36 sm:pt-28 lg:px-12 lg:pt-32">
                <div className="mx-auto max-w-5xl text-center">
                    <p
                        className={`${googleSansFlex.className} mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-green-brand sm:mb-7 sm:text-sm`}
                    >
                        THE DEV TINDER EXPERIENCE
                    </p>

                    <h1
                        className={`${googleSans.className} text-balance text-[clamp(3.5rem,8.5vw,8rem)] font-bold leading-[0.88] tracking-[-0.065em]`}
                    >
                        Meet the right
                        <br />
                        <span className="text-green-brand">
                            people. Build.
                        </span>
                    </h1>

                    <p
                        className={`${googleSansFlex.className} mx-auto mt-8 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:mt-10 sm:text-lg sm:leading-8`}
                    >
                        Discover developers who share your interests,
                        connect around ideas, and turn promising
                        conversations into meaningful projects.
                    </p>
                </div>

                <div className="mx-auto mt-16 w-full max-w-6xl sm:mt-20 lg:mt-24">
                    <div className="overflow-hidden rounded-[1.25rem] bg-neutral-100 shadow-[0_20px_70px_rgba(0,0,0,0.08)] dark:bg-neutral-900 dark:shadow-[0_20px_70px_rgba(0,0,0,0.28)]">
                        <div className="flex h-10 items-center px-4">
                            <div className="flex items-center gap-1.5">
                                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                                <span className="size-2.5 rounded-full bg-[#28c840]" />
                            </div>

                            <div
                                className={`${googleSansFlex.className} mx-auto hidden h-6 w-72 items-center justify-center rounded-md bg-black/[0.035] text-[10px] text-muted-foreground dark:bg-white/4.5 sm:flex`}
                            >
                                devtinder.tech
                            </div>

                            <div className="w-12" />
                        </div>

                        <div className="relative aspect-video w-full overflow-hidden bg-black">
                            <video
                                controls
                                playsInline
                                preload="metadata"
                                poster="/brand/social/og-image.png"
                                className="block size-full object-cover"
                            >
                                <source
                                    src="/videos/LandingHowItWorks.mp4"
                                    type="video/mp4"
                                />

                                Your browser does not support the video element.
                            </video>
                        </div>
                    </div>

                    <div
                        className={`${googleSansFlex.className} mt-4 flex items-center justify-between px-1 text-xs text-muted-foreground`}
                    >
                        <span>A closer look at DevTinder</span>

                        <span className="hidden tracking-[0.14em] sm:block">
                            DISCOVER · CONNECT · CREATE
                        </span>
                    </div>
                </div>

                <div className="mx-auto mt-32 max-w-4xl text-center sm:mt-40">
                    <h2
                        className={`${googleSans.className} text-balance text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.045em]`}
                    >
                        Your next great project
                        <br />
                        can start with a{" "}
                        <span className="text-green-brand">
                            connection.
                        </span>
                    </h2>

                    <p
                        className={`${googleSansFlex.className} mx-auto mt-6 max-w-xl text-sm leading-7 text-muted-foreground sm:mt-7 sm:text-base`}
                    >
                        Find people with complementary skills, shared
                        interests, and the motivation to build something
                        worth sharing.
                    </p>
                </div>
            </section>

            <section className="border-t border-black/6 dark:border-white/[0.07]">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-20 sm:px-8 sm:py-24 lg:flex-row lg:items-center lg:justify-between lg:px-12">
                    <div className="max-w-xl">
                        <h2
                            className={`${googleSans.className} text-2xl font-semibold tracking-light sm:text-3xl`}
                        >
                            Start building with the right people.
                        </h2>

                        <p
                            className={`${googleSansFlex.className} mt-2 text-sm leading-6 text-muted-foreground sm:text-base`}
                        >
                            Discover developers and find your next
                            collaboration.
                        </p>
                    </div>

                    <a
                        href="/"
                        className={`${googleSansFlex.className} inline-flex h-11 items-center gap-2 self-start rounded-full bg-foreground px-6 text-sm font-medium text-background transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 lg:self-auto`}
                    >
                        Explore DevTinder
                        <span className="text-base leading-none">
                            →
                        </span>
                    </a>
                </div>
            </section>
        </main>
    );
}