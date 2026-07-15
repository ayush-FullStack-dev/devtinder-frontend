import type { Metadata } from "next";

import "@/app/style/globals.css";

import Providers from "./Providers/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://dev-tinder-project.vercel.app"),
  title: {
    default: "DevTinder | Collab, Make Friends & Meet New People",
    template: "%s | DevTinder",
  },
  description: "Connect with developers, collaborate on projects, and grow your network.",
  verification: {
    google: "BJXdoBSR_OubTKk_mnCOsuL6kw1p7qqh7SKUidWLIcI",
  },
  openGraph: {
    type: 'website',
    siteName: "DevTinder",
    locale: "en_US",
    images: [{
      url: "/brand/social/og-image.png", width: 1200,
      height: 630,
      alt: "DevTinder social preview image"
    }],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className="min-h-screen flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
