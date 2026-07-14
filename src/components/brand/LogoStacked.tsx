"use client"
import { useRouter } from "next/navigation";
import LogoMark from "@/components/brand/LogoMark";
import LogoWordmark from "@/components/brand/LogoWordmark";


type LogoStackedProps = {
  markClassName?: string;
  wordmarkClassName?: string;
  className?: string;
  logoMonoChrome?: boolean;
  workMarkMonoChrome?: boolean;
  monoChrome?: boolean;
};

export default function LogoStacked({
  markClassName,
  wordmarkClassName,
  className,
  monoChrome = false,
  workMarkMonoChrome = false,
  logoMonoChrome = false,
}: LogoStackedProps) {

  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  }

  return (
    <div
      className={`inline-flex justify-center items-center flex-col gap-2 ${className ?? ""} `} onClick={handleClick}
    >
      <LogoMark
        monoChrome={!!monoChrome || !!logoMonoChrome}
        className={`h-8 w-auto  ${markClassName ?? "shrink-0 h-12"}`}
      />

      <LogoWordmark
        className={wordmarkClassName ?? "h-7  shrink-0 ml-4"}
        monoChrome={!!monoChrome || !!workMarkMonoChrome}
      />
    </div>
  );
}
