import type { Metadata } from "next";
import Link from "next/link";
import { AppName } from "@/constants/constants";
import { TRUSTED_APP_ORIGIN } from "@/constants/url";
import { googleSans, googleSansFlex } from "@/assets/fonts/font.google";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Learn how ${AppName} handles your data, what information is collected, and how your privacy is protected on the platform.`,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: `Privacy Policy — ${AppName}`,
    description: `Learn how ${AppName} handles your data, what information is collected, and how your privacy is protected on the platform.`,
    url: `${TRUSTED_APP_ORIGIN}/privacy`,
    type: "website",
  },
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>

        <div
          className={`${googleSansFlex.className} space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg`}
        >
          <p>
            Your privacy matters to us. This policy describes what information{" "}
            {AppName} collects, how it is used, and how it is protected. By
            using {AppName}, you agree to the practices described below.
          </p>

          <h2
            className={`${googleSans.className} pt-4 text-2xl font-semibold text-foreground`}
          >
            Information We Collect
          </h2>
          <p>
            When you create an account on {AppName}, we collect the
            information you provide during registration, including your name,
            email address, and username. Your profile information — such as
            your bio, tech stack, location, experience level, and profile
            images — is collected when you complete your developer profile.
          </p>
          <p>
            We also collect usage data such as authentication tokens stored in
            cookies to maintain your session. {AppName} uses Vercel Analytics
            and Vercel Speed Insights to understand general usage patterns and
            improve platform performance. These services collect anonymized,
            aggregated data.
          </p>

          <h2
            className={`${googleSans.className} pt-4 text-2xl font-semibold text-foreground`}
          >
            How We Use Your Information
          </h2>
          <p>
            Your profile information is used to create your developer profile
            visible to other users on the platform. Your email is used for
            account verification, authentication, and important account
            notifications. Usage analytics are used solely to improve platform
            performance and user experience.
          </p>

          <h2
            className={`${googleSans.className} pt-4 text-2xl font-semibold text-foreground`}
          >
            Cookies and Authentication
          </h2>
          <p>
            {AppName} uses essential cookies to manage authentication and
            maintain your session. These include access tokens and refresh
            tokens. No third-party advertising or tracking cookies are used.
          </p>

          <h2
            className={`${googleSans.className} pt-4 text-2xl font-semibold text-foreground`}
          >
            Data Sharing
          </h2>
          <p>
            We do not sell your personal information. Your developer profile
            is visible to other authenticated users of the platform as part
            of the discovery and matching experience. We use Vercel for
            hosting and analytics. We do not share your data with other
            third-party services for marketing purposes.
          </p>

          <h2
            className={`${googleSans.className} pt-4 text-2xl font-semibold text-foreground`}
          >
            Data Security
          </h2>
          <p>
            We implement appropriate security measures to protect your data,
            including secure authentication flows, encrypted connections via
            HTTPS, and secure cookie handling. Access to your account is
            protected by your chosen authentication method.
          </p>

          <h2
            className={`${googleSans.className} pt-4 text-2xl font-semibold text-foreground`}
          >
            Your Rights
          </h2>
          <p>
            You can access, update, or delete your profile information
            through your account settings at any time. If you wish to delete
            your account entirely, contact us at{" "}
            <a
              href="mailto:support@devtinder.tech"
              className="text-green-brand transition-colors hover:text-green-accent"
            >
              support@devtinder.tech
            </a>{" "}
            and we will process your request promptly.
          </p>

          <h2
            className={`${googleSans.className} pt-4 text-2xl font-semibold text-foreground`}
          >
            Changes to This Policy
          </h2>
          <p>
            We may update this privacy policy from time to time. When we make
            changes, we will update the page and notify users through the
            platform where appropriate. Continued use of {AppName} after
            changes constitutes acceptance of the updated policy.
          </p>

          <h2
            className={`${googleSans.className} pt-4 text-2xl font-semibold text-foreground`}
          >
            Contact
          </h2>
          <p>
            If you have questions about this privacy policy or how your data
            is handled, please contact us at{" "}
            <a
              href="mailto:support@devtinder.tech"
              className="text-green-brand transition-colors hover:text-green-accent"
            >
              support@devtinder.tech
            </a>
            .
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
                href="/contact"
                className="text-green-brand transition-colors hover:text-green-accent"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}
