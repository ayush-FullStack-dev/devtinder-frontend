"use client"
import JsonLd from "@/constants/JsonLd";
import Navbar from "./_components/LandingPage/Navbar";
import { googleSans } from "@/assets/fonts/font.google";
import PrimaryButton from "@/components/shared/PrimaryButton";
import Link from "next/link";


export function PageLayout() {
  return (
    <main  id="main-scroll" className="relative h-screen w-full overflow-y-auto bg-background select-none scrollbar-hide">
      <Navbar />

      <div
        className="
      min-h-full
      px-4  
 pt-30
      pb-5
      flex flex-col
      items-center
      justify-center
    "
      >
        <div className="flex flex-col items-center gap-5 xs:gap-6">
          {/* Hero Heading */}
          <div
            className={`${googleSans.className}
          text-center
          font-semibold
          leading-[0.95]

          text-3xl
          xs:text-4xl
          sm:text-6xl
          md:text-7xl
          lg:text-8xl
        `}
          >
            <p>Great builds</p>
            <p>starts with</p>
            <p className="text-green-brand">the right people.</p>
          </div>

          {/* Description */}
          <div
            className={`${googleSans.className}
          max-w-xs
          text-center
          text-sm
          leading-relaxed
          text-muted-foreground

          xs:max-w-sm
          xs:text-base

          sm:max-w-md
          sm:text-lg

          md:max-w-lg
          md:text-xl
        `}
          >
            <p>DevTinder is where developers connect,</p>
            <p>collaborate and build something real.</p>
          </div>

          {/* CTA */}
          <Link
            href="/signup"
            className="
          mt-4
          w-full
          max-w-xs
          xs:max-w-sm
          sm:w-110
          sm:max-w-none
          md:w-115
          lg:w-120
          xl:w-130
        "
          >
            <PrimaryButton
              className="
            h-12 w-full rounded-full px-4 text-base
            xs:h-13 xs:text-lg
            sm:h-14 sm:text-xl
            lg:h-15 lg:text-xl
            xl:text-2xl
            bg-green-brand
          "
              text="Get Started"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(JsonLd),
        }}
      />

      <PageLayout />
    </>
  );
}
