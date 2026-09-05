
import type { Metadata } from "next";
import Link from "next/link";
import { AppName } from "@/constants/constants";
import { TRUSTED_APP_ORIGIN } from "@/constants/url";
import { googleSans, googleSansFlex } from "@/assets/fonts/font.google";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${AppName} team for support, feedback, partnership inquiries, or privacy-related questions.`,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact ${AppName}`,
    description: `Get in touch with the ${AppName} team for support, feedback, partnership inquiries, or privacy-related questions.`,
    url: `${TRUSTED_APP_ORIGIN}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
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
          Contact {AppName}
        </h1>

        <div
          className={`${googleSansFlex.className} space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg`}
        >
          <p>
            We would love to hear from you. Whether you have a question about
            the platform, want to report a bug, or have feedback to share, we
            are here to help.
          </p>

          <h2
            className={`${googleSans.className} pt-4 text-2xl font-semibold text-foreground`}
          >
            Get In Touch
          </h2>

          <p>
            For general inquiries, support requests, and feedback, you can
            reach the {AppName} team by emailing{" "}
            <a
              href="mailto:support@devtinder.tech"
              className="text-green-brand transition-colors hover:text-green-accent"
            >
              support@devtinder.tech
            </a>
            . We aim to respond to all messages within 48 hours.
          </p>

          <h2
            className={`${googleSans.className} pt-4 text-2xl font-semibold text-foreground`}
          >
            What You Can Contact Us About
          </h2>

          <ul className="list-inside list-disc space-y-2 pl-2">
            <li>Account issues and technical support</li>
            <li>Bug reports and feature requests</li>
            <li>Partnership and collaboration inquiries</li>
            <li>Privacy and data-related questions</li>
            <li>General feedback about the platform</li>
            <li>Security vulnerability reports</li>
          </ul>

          <h2
            className={`${googleSans.className} pt-4 text-2xl font-semibold text-foreground`}
          >
            Response Times
          </h2>

          <p>
            We prioritize all incoming messages and typically respond within
            one to two business days. For urgent account-related issues,
            please include your username in the subject line so we can locate
            your account quickly. Security-related reports are given the
            highest priority.
          </p>

          <h2
            className={`${googleSans.className} pt-4 text-2xl font-semibold text-foreground`}
          >
            Legal Information
          </h2>

          <p>
            The following information is provided for legal, payment-provider,
            and business verification purposes.
          </p>

          <p>
            <span className="text-foreground">Legal Name:</span>{" "}
            MANORAMA DEVI
            <br />
            <span className="text-foreground">Official Email:</span>{" "}
            <a
              href="mailto:ayush.shriv.dev@gmail.com"
              className="text-green-brand transition-colors hover:text-green-accent"
            >
              ayush.shriv.dev@gmail.com
            </a>
            <br />   
          </p>

          <p>
            The above information is provided for legal and payment-provider
            verification purposes. For all user support, account issues,
            feedback, bug reports, and other platform-related inquiries,
            please contact{" "}
            <a
              href="mailto:support@devtinder.tech"
              className="text-green-brand transition-colors hover:text-green-accent"
            >
              support@devtinder.tech
            </a>
            . We aim to respond to all support messages within 48 hours.
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
                href="/about"
                className="text-green-brand transition-colors hover:text-green-accent"
              >
                About
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
