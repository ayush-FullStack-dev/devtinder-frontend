"use client"

import { useRouter } from "next/navigation";
import LogoWord from "@/../public/brand/logo/logo-wordmark.svg";
import monoChromeWordMark from "@/../public/brand/logo/monochrome-wordmark.svg";

type LogoWordmarkProps = {
  className?: string;
  monoChrome?: boolean;
};

export default function LogoWordmark({
  className,
  monoChrome = false,
}: LogoWordmarkProps) {
  const Component = monoChrome ? monoChromeWordMark : LogoWord;

  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  }

  return (
    <Component
      className={`h-8 w-auto select-none pointer-events-none ${className ?? ""}`}
      draggable={false}
      onClick={handleClick}
      aria-hidden="true"
    />
  );
}
