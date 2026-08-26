import type { Metadata } from "next";

import "@/app/style/globals.css";

import Providers from "./Providers/Providers";
import { AppName } from "@/constants/constants";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: {
    default: `${AppName} — Connect, Collaborate & Build with Developers`,
    template: `%s | ${AppName}`,
  },
  description:
    "DevTinder is a developer matchmaking platform where software engineers discover, connect, and collaborate with other developers. Find project partners, co-founders, and grow your professional network.",
  verification: {
    google: "BJXdoBSR_OubTKk_mnCOsuL6kw1p7qqh7SKUidWLIcI",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: AppName,
    locale: "en_US",
    title: `${AppName} — Connect, Collaborate & Build with Developers`,
    description:
      `${AppName} is a developer matchmaking platform where software engineers discover, connect, and collaborate with other developers.`,
    url: process.env.NEXT_PUBLIC_APP_URL!,
    images: [
      {
        url: "/brand/social/og-image.png",
        width: 1200,
        height: 630,
        alt: `${AppName} — Developer matchmaking platform`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${AppName} — Connect, Collaborate & Build with Developers`,
    description:
      `${AppName} is a developer matchmaking platform where software engineers discover, connect, and collaborate with other developers.`,
    images: ["/brand/social/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full scrollbar-hide"
    >
      <body className="min-h-screen flex flex-col scrollbar-hide">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}