"use client"

import { useRouter } from "next/navigation";
import Logo from "@/../public/brand/logo/logo-mark.svg";
import LogoMono from "@/../public/brand/logo/logo-mark-monochrome.svg";

type LogoMarkProps = {
  monoChrome?: boolean;
  className?: string;
};

export default function LogoMark({
  monoChrome = false,
  className,
}: LogoMarkProps) {

  const Component = monoChrome ? LogoMono : Logo;

  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  }


  return (
    <Component
      className={`select-none pointer-events-none ${className ?? ""}`}
      onClick={handleClick}
      draggable={false}
      aria-hidden="true"
    />
  );
}
