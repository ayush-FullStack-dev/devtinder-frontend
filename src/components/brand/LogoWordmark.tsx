import Image from "next/image";
import LogoWord from "@/../public/brand/logo/logo-wordmark.svg";

type LogoWordmarkProps = {
  className?: string;
};

export default function LogoWordmark({ className }: LogoWordmarkProps) {
  return (
    <LogoWord
      className={`h-8 w-auto select-none pointer-events-none ${className ?? ""}`}
      draggable={false}
      aria-hidden="true"
    />
  );
}
