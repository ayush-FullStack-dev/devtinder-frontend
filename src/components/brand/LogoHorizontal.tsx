"use client"

import LogoMark from "@/components/brand/LogoMark";
import LogoWordmark from "@/components/brand/LogoWordmark";
import { useRouter } from "next/navigation";

type LogoHorizontalProps = {
  markClassName?: string;
  wordmarkClassName?: string;
  className?: string;
  logoMonoChrome?: boolean;
  workMarkMonoChrome?: boolean;
  monoChrome?: boolean;
};

export default function LogoHorizontal({
  markClassName,
  wordmarkClassName,
  className,
  monoChrome = false,
  workMarkMonoChrome = false,
  logoMonoChrome = false,
}: LogoHorizontalProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };
  return (
    <div className={`inline-flex items-center gap-2 ${className ?? ""}`} onClick={handleClick}>
      <LogoMark
        monoChrome={!!monoChrome || !!logoMonoChrome}
        className={`h-6 w-auto  ${markClassName ?? "shrink-0 size-8"}`}
      />

      <LogoWordmark
        className={wordmarkClassName ?? "h-8 w-auto shrink-0 "}
        monoChrome={!!monoChrome || !!workMarkMonoChrome}
      />
    </div>
  );
}
