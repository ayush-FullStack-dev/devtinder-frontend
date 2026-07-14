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
  openGraph: {
    title: "DevTinder - log in or sign up",
    description: `Create an account or login in to DevTinder.
    \n Connect with developers, collaborate on projects, and grow your network`,
    images: ["/brand/social/og-image.png"],
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
