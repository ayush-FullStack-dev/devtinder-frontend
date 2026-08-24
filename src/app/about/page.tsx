import type { Metadata } from "next";
import Link from "next/link";
import { AppName } from "@/constants/constants";
import { TRUSTED_APP_ORIGIN } from "@/constants/url";
import { googleSans, googleSansFlex } from "@/assets/fonts/font.google";

export const metadata: Metadata = {
  title: "About",
  description: `${AppName} is a developer matchmaking platform where software engineers discover, connect, and collaborate with other developers.`,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About ${AppName}`,
    description: `${AppName} is a developer matchmaking platform where software engineers discover, connect, and collaborate with other developers.`,
    url: `${TRUSTED_APP_ORIGIN}/about`,
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <Link
          href="/"
          className={`${googleSansFlex.className} mb-12 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground`}
        >
          ← Back to Home
        </Link>

        <h1
          className={`${googleSans.className} mb-8 text-4xl font-bold leading-tight sm:text-5xl`}
        >
          About {AppName}
        </h1>

        <div
          className={`${googleSansFlex.className} space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg`}
        >
          <p>
            {AppName} is a developer matchmaking platform designed to help
            software engineers discover, connect, and collaborate with other
            developers. Whether you are looking for a co-founder, a project
            partner, or simply want to expand your professional network,{" "}
            {AppName} makes it easy to find the right people.
          </p>

          <h2
            className={`${googleSans.className} pt-4 text-2xl font-semibold text-foreground`}
          >
            How It Works
          </h2>
          <p>
            The platform uses a swipe-based discovery experience where
            developers can browse profiles, view tech stacks, experience
            levels, and professional interests. When two developers express
            mutual interest, they are matched and can begin communicating
            directly through the platform.
          </p>

          <h2
            className={`${googleSans.className} pt-4 text-2xl font-semibold text-foreground`}
          >
            Who Is {AppName} For
          </h2>
          <p>
            {AppName} is built for developers of all experience levels — from
            students and early-career engineers to senior architects and
            technical leads. Frontend engineers, backend developers, DevOps
            specialists, mobile developers, cloud architects, and full-stack
            engineers all use {AppName} to find peers who share their
            technical interests and professional goals.
          </p>

          <h2
            className={`${googleSans.className} pt-4 text-2xl font-semibold text-foreground`}
          >
            Our Mission
          </h2>
          <p>
            Building great software is a collaborative effort. {AppName}{" "}
            exists to make meaningful developer connections accessible to
            everyone. The platform focuses on genuine professional
            relationships rather than superficial networking, helping
            developers find collaborators who complement their skills and
            share their passion for building.
          </p>
        </div>

        <nav className="mt-16 border-t border-border pt-8">
          <p
            className={`${googleSansFlex.className} mb-4 text-sm font-medium text-muted-foreground`}
          >
            Learn more
          </p>
          <ul
            className={`${googleSansFlex.className} flex flex-wrap gap-6 text-sm`}
          >
            <li>
              <Link
                href="/"
                className="text-green-brand transition-colors hover:text-green-accent"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-green-brand transition-colors hover:text-green-accent"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-green-brand transition-colors hover:text-green-accent"
              >
                Privacy
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}
