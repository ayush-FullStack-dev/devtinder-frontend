"use client";

import Image from "next/image";
import {
    FaGithub,
    FaInstagram,
    FaLinkedinIn,
    FaXTwitter,
} from "react-icons/fa6";

import { FaLinkedin } from "react-icons/fa6";

import LogoHorizontal from "@/components/brand/LogoHorizontal";
import { Separator } from "@/components/ui/separator";
import {
    googleSans,
    googleSansFlex,
} from "@/assets/fonts/font.google";

const FOOTER_CONFIG = {
    externalLinksInNewTab: true,
} as const;

const FOOTER_COLUMNS = [
    {
        title: "PRODUCT",
        links: [
            ["Discover", "#discover"],
            ["How it works", "#how-it-works"],
            ["Features", "#why-devtinder"],
        ],
    },
    {
        title: "DEVELOPERS",
        links: [
            ["Find developers", "#"],
            ["Profiles", "#"],
            ["For companies", "#"],
        ],
    },
    {
        title: "RESOURCES",
        links: [
            ["Docs", "#"],
            ["FAQ", "#frequently-asked-questions"],
            ["Blog", "#"],
            ["Help center", "/help-center"],
        ],
    },
    {
        title: "COMPANY",
        links: [
            ["About", "/about"],
            ["Contact", "/contact"],
            ["Careers", "/careers"],
        ],
    },
    {
        title: "LEGAL",
        links: [
            ["Privacy Policy", "/privacy"],
            ["Cookie Policy", "/cookie-policy"],
            ["Terms of Service", "/terms-of-service"],
            ["Community Guidelines", "/community-guidelines"],
        ],
    },
] as const;

const SOCIAL_LINKS = [
    {
        label: "GitHub",
        href: "https://github.com/ayush-FullStack-dev",
        icon: FaGithub,
        hoverClass: "hover:text-white",
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/ayushfullstack",
        icon: FaLinkedin,
        hoverClass: "hover:text-[#0A66C2]",
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/coding_like_developer/",
        icon: FaInstagram,
        hoverClass: "hover:text-[#E4405F]",
    },
    {
        label: "X",
        href: "https://x.com/ayush_fullstack",
        icon: FaXTwitter,
        hoverClass: "hover:text-white",
    },
] as const;

const BRAND_CHARS = [
    "D",
    "e",
    "v",
    "T",
    "i",
    "n",
    "d",
    "e",
    "r",
] as const;

const externalLinkProps = FOOTER_CONFIG.externalLinksInNewTab
    ? {
        target: "_blank" as const,
        rel: "noopener noreferrer",
    }
    : {};

type FooterLink = readonly [string, string];

type FooterColumnProps = {
    title: string;
    links: readonly FooterLink[];
};

const FooterColumn = ({
    title,
    links,
}: FooterColumnProps) => {
    return (
        <div className="min-w-0">
            <p
                className="
                    mb-4
                    text-[10px]
                    font-medium
                    leading-none
                    tracking-[0.055em]
                    text-white/45
                    xs:text-[11px]
                    sm:mb-5
                    sm:text-xs
                    lg:mb-5
                    2xl:mb-6
                "
            >
                {title}
            </p>

            <ul
                className="
                    flex
                    flex-col
                    gap-2
                    xs:gap-3
                    sm:gap-3.5
                    lg:gap-4
                    2xl:gap-4
                "
            >
                {links.map(([label, href]) => (
                    <li key={label}>
                        <a
                            href={href}
                            className="
                                inline-block
                                text-[13px]
                                font-normal
                                leading-[1.15]
                                tracking-[-0.01em]
                                text-white/80
                                transition-colors
                                duration-200
                                hover:text-white
                                sm:text-sm
                                lg:text-[15px]
                                2xl:text-base
                            "
                        >
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const FooterSocials = () => {
    return (
        <nav
            aria-label="Social media"
            className="
                mt-6
                flex
                items-center
                gap-6
                xs:gap-5
                sm:mt-7
                lg:gap-7
                2xl:gap-8
            "
        >
            {SOCIAL_LINKS.map(
                ({ label, href, icon: Icon, hoverClass }) => (
                    <a
                        key={label}
                        href={href}
                        aria-label={label}
                        {...externalLinkProps}
                        className={`
        flex
        size-5
        items-center
        justify-center
        text-white
        transition-all
        duration-200
        hover:scale-110
        ${hoverClass}
        xs:size-5
        sm:size-5
        2xl:size-6
    `}
                    >
                        <Icon className="size-full" />
                    </a>
                ),
            )}
        </nav>
    );
};

const FooterLegalNavigation = () => {
    const legalColumn = FOOTER_COLUMNS.find(
        (column) => column.title === "LEGAL",
    );

    return (
        <nav
            aria-label="Legal navigation"
            className="
                flex
                flex-wrap
                items-center
                justify-start
                gap-x-5
                gap-y-2
                md:justify-end
                md:gap-x-7
                lg:gap-x-8
                xl:gap-x-9
                2xl:gap-x-10
            "
        >
            {legalColumn?.links.map(([label, href]) => (
                <a
                    key={label}
                    href={href}
                    className="
                        whitespace-nowrap
                        text-[11px]
                        font-normal
                        leading-none
                        tracking-[-0.01em]
                        text-white/70
                        transition-colors
                        duration-200
                        hover:text-white
                        sm:text-xs
                        md:text-[13px]
                        2xl:text-sm
                    "
                >
                    {label}
                </a>
            ))}
        </nav>
    );
};

const LandingFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            id="footer"
            className={`
                relative
                isolate
                min-h-150
                w-full
                overflow-hidden
                bg-fixed-black
                text-fixed-white
                xs:min-h-155
                sm:min-h-158
                md:min-h-152
                lg:min-h-157
                xl:min-h-162
                2xl:min-h-167
                3xl:min-h-175
                4xl:min-h-183
                5xl:min-h-192
                7xl:min-h-210
                10xl:min-h-230
            `}
        >
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-0
                    select-none
                "
            >
                <Image
                    src="/images/footer-bg.webp"
                    alt=""
                    role="presentation"
                    fill
                    sizes="100vw"
                    className="
                        hidden
                        object-cover
                        object-center
                        lg:block
                    "
                />

                <Image
                    src="/images/footer-bg-mobile.webp"
                    alt=""
                    role="presentation"
                    fill
                    sizes="100vw"
                    className="
                        object-cover
                        object-center
                        lg:hidden
                    "
                />

                <div className="absolute inset-0 bg-[#111111]/30" />
            </div>
            <div className="relative z-20 h-full w-full lg:w-[98%] xl:w-[95%] overflow-hidden lg:mx-auto">
                <div>
                    <LogoHorizontal monoChrome={true} />
                    <p className="font-normal text-[#9C9C9E]">
                        A place where developer meet, collabrate and build together. Find your next developer friend, co-founder, or team member here.
                    </p>
                    <div>
                        <FooterSocials />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;