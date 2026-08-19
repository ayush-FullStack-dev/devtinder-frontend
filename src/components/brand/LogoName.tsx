"use client"

import { useRouter } from "next/navigation";
import Logo from "@/../public/brand/logo/logo-name.svg";
import LogoMono from "@/../public/brand/logo/logo-name-monochrome.svg";

type LogoNameProps = {
  monoChrome?: boolean;
  className?: string;
};

export default function LogoName({
  monoChrome = false,
  className,
}: LogoNameProps) {

  const Component = monoChrome ? LogoMono : Logo;

  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  }


  return (
    <Component
      className={`select-none pointer-events-none ${monoChrome ? "text-[var(--foreground-logo)]" : ""
        } ${className ?? ""}`}
      onClick={handleClick}
      draggable={false}
      aria-hidden="true"
    />
  );
}
