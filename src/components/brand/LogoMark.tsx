import Logo from "@/../public/brand/logo/logo-mark.svg";
import LogoMono from "@/../public/brand/logo/logo-mark-monochrome.svg";
import Image from "next/image";

type LogoMarkProps = {
  monoChrome?: boolean;
  className?: string;
};

export default function LogoMark({
  monoChrome = false,
  className,
}: LogoMarkProps) {
  const Component = monoChrome ? LogoMono : Logo;

  return (
    <Component
      className={`select-none pointer-events-none ${className ?? ""}`}
      draggable={false}
      aria-hidden="true"
    />
  );
}
