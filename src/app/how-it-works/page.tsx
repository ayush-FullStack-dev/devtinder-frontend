import type { Metadata } from "next";

import { AppName } from "@/constants/constants";
import { TRUSTED_APP_ORIGIN } from "@/constants/url";
import {
    googleSans,
    googleSansFlex,
} from "@/assets/fonts/font.google";

const videoUrl =
    `${TRUSTED_APP_ORIGIN}/videos/LandingHowItWorks.mp4`;

const thumbnailUrl =
    `${TRUSTED_APP_ORIGIN}/brand/social/og-image.png`;

const pageUrl =
    `${TRUSTED_APP_ORIGIN}/how-it-works`;

export const metadata: Metadata = {
    title: `How ${AppName} Works — Meet Developers. Build Together.`,
    description:
        "See how DevTinder helps developers discover the right people, connect around ideas, and turn conversations into meaningful collaboration.",
    alternates: {
        canonical: "/how-it-works",
    },
    openGraph: {
        type: "website",
        title: `How ${AppName} Works — Meet Developers. Build Together.`,
        description:
            "See how DevTinder helps developers discover the right people, connect around ideas, and turn conversations into meaningful collaboration.",
        url: pageUrl,
        images: [
            {
                url: thumbnailUrl,
                width: 1200,
                height: 630,
                alt: `How ${AppName} Works`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: `How ${AppName} Works — Meet Developers. Build Together.`,
        description:
            "See how DevTinder helps developers discover, connect, and collaborate.",
        images: [thumbnailUrl],
    },
    robots: {
        index: true,
        follow: true,
    },
};

const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",

    name: `How ${AppName} Works`,
    description:
        "See how DevTinder helps developers discover the right people, connect around ideas, and turn conversations into meaningful collaboration.",

    thumbnailUrl: [thumbnailUrl],

    uploadDate: "2026-08-27T00:00:00+05:30",

    contentUrl: videoUrl,
    embedUrl: pageUrl,

    publisher: {
        "@type": "Organization",
        name: AppName,
        url: TRUSTED_APP_ORIGIN,
        logo: {
            "@type": "ImageObject",
            url: `${TRUSTED_APP_ORIGIN}/brand/logo/logo-mark.svg`,
        },
    },

    isFamilyFriendly: true,
};

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
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

                    <span>
                        Back to {AppName}
                    </span>
                </a>
            </header>

            <section className="mx-auto w-full max-w-7xl px-6 pb-24 pt-16 sm:px-8 sm:pb-32 sm:pt-20 lg:px-12 lg:pt-24">
                <div className="mx-auto max-w-6xl">
                    <div className="mx-auto max-w-4xl text-center">
                        <p
                            className={`${googleSansFlex.className} mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-green-brand sm:text-sm`}
                        >
                            HOW {AppName.toUpperCase()} WORKS
                        </p>

                        <h1
                            className={`${googleSans.className} text-balance text-[clamp(3.25rem,8vw,7rem)] font-bold leading-[0.88] tracking-[-0.065em] flex flex-col gap-5`}
                        >
                            Meet the right
                   
                            
                            <span className="text-green-brand">
                                people. Build.
                            </span>
                        </h1>

                        <p
                            className={`${googleSansFlex.className} mx-auto mt-7 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:mt-8 sm:text-lg sm:leading-8`}
                        >
                            Discover developers who share your interests,
                            connect around ideas, and turn promising
                            conversations into meaningful projects.
                        </p>
                    </div>

             
                    <div className="mt-14 sm:mt-18 lg:mt-20">
                        <div className="overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-black shadow-[0_30px_100px_rgba(0,0,0,0.14)] dark:border-white/[0.08] dark:shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
               
                            <div className="flex h-11 items-center border-b border-white/[0.06] bg-neutral-950 px-4">
                                <div className="flex items-center gap-1.5">
                                    <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                                    <span className="size-2.5 rounded-full bg-[#febc2e]" />
                                    <span className="size-2.5 rounded-full bg-[#28c840]" />
                                </div>

                                <div
                                    className={`${googleSansFlex.className} mx-auto hidden h-6 min-w-56 items-center justify-center rounded-md bg-white/[0.05] px-4 text-[10px] tracking-wide text-white/45 sm:flex`}
                                >
                                    {TRUSTED_APP_ORIGIN.replace(
                                        /^https?:\/\//,
                                        "",
                                    )}
                                </div>

                                <div className="w-10" />
                            </div>

                            <div className="relative aspect-video w-full bg-black">
                                <video
                                    controls
                                    playsInline
                                    preload="metadata"
                                    poster="/brand/social/og-image.png"
                                    className="block size-full object-contain"
                                >
                                    <source
                                        src="/videos/LandingHowItWorks.mp4"
                                        type="video/mp4"
                                    />

                                    Your browser does not support the video
                                    element.
                                </video>
                            </div>
                        </div>

                        <div
                            className={`${googleSansFlex.className} mt-4 flex flex-col gap-2 px-1 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between`}
                        >
                            <span>
                                A closer look at {AppName}
                            </span>

                            <span className="tracking-[0.14em]">
                                DISCOVER · CONNECT · CREATE
                            </span>
                        </div>
                    </div>

  
                    <div className="mx-auto mt-28 max-w-4xl sm:mt-36">
                        <div className="grid gap-12 sm:grid-cols-3 sm:gap-8">
                            <div>
                                <p
                                    className={`${googleSansFlex.className} text-xs font-semibold uppercase tracking-[0.16em] text-green-brand`}
                                >
                                    01
                                </p>

                                <h2
                                    className={`${googleSans.className} mt-4 text-xl font-semibold tracking-[-0.03em] sm:text-2xl`}
                                >
                                    Discover
                                </h2>

                                <p
                                    className={`${googleSansFlex.className} mt-3 text-sm leading-6 text-muted-foreground`}
                                >
                                    Find developers with complementary
                                    skills, interests, and ideas.
                                </p>
                            </div>

                            <div>
                                <p
                                    className={`${googleSansFlex.className} text-xs font-semibold uppercase tracking-[0.16em] text-green-brand`}
                                >
                                    02
                                </p>

                                <h2
                                    className={`${googleSans.className} mt-4 text-xl font-semibold tracking-[-0.03em] sm:text-2xl`}
                                >
                                    Connect
                                </h2>

                                <p
                                    className={`${googleSansFlex.className} mt-3 text-sm leading-6 text-muted-foreground`}
                                >
                                    Start conversations around shared
                                    interests and what you want to build.
                                </p>
                            </div>

                            <div>
                                <p
                                    className={`${googleSansFlex.className} text-xs font-semibold uppercase tracking-[0.16em] text-green-brand`}
                                >
                                    03
                                </p>

                                <h2
                                    className={`${googleSans.className} mt-4 text-xl font-semibold tracking-[-0.03em] sm:text-2xl`}
                                >
                                    Create
                                </h2>

                                <p
                                    className={`${googleSansFlex.className} mt-3 text-sm leading-6 text-muted-foreground`}
                                >
                                    Turn the right connection into something
                                    worth building together.
                                </p>
                            </div>
                        </div>
                    </div>
            <div className="mx-auto mt-28 max-w-4xl text-center sm:mt-40">
                        <h2
                            className={`${googleSans.className} text-balance text-[clamp(2.5rem,5.5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.05em]`}
                        >
                            Your next great project
                            <br />
                            can start with a{" "}
                            <span className="text-green-brand">
                                connection.
                            </span>
                        </h2>

                        <p
                            className={`${googleSansFlex.className} mx-auto mt-6 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base`}
                        >
                            Find people with complementary skills, shared
                            interests, and the motivation to build something
                            meaningful together.
                        </p>
                    </div>
                </div>
            </section>

   
   
            <section className="border-t border-black/[0.06] dark:border-white/[0.07]">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-20 sm:px-8 sm:py-24 lg:flex-row lg:items-center lg:justify-between lg:px-12">
                    <div className="max-w-xl">
                        <h2
                            className={`${googleSans.className} text-2xl font-semibold tracking-[-0.03em] sm:text-3xl`}
                        >
                            Ready to find your next collaborator?
                        </h2>

                        <p
                            className={`${googleSansFlex.className} mt-2 text-sm leading-6 text-muted-foreground sm:text-base`}
                        >
                            Discover developers and start building together.
                        </p>
                    </div>

                    <a
                        href="/"
                        className={`${googleSansFlex.className} inline-flex h-11 items-center gap-2 self-start rounded-full bg-foreground px-6 text-sm font-medium text-background transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 lg:self-auto`}
                    >
                        Explore {AppName}

                        <span className="text-base leading-none">
                            →
                        </span>
                    </a>
                </div>
            </section>
        </main>
    );
}
