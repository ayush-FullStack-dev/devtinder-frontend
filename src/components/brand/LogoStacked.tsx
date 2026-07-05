import LogoMark from "@/components/brand/LogoMark";
import LogoWordmark from "@/components/brand/LogoWordmark";

type LogoStackedProps = {
  markClassName?: string;
  wordmarkClassName?: string;
  className?: string;
};

export default function LogoStacked({
  markClassName,
  wordmarkClassName,
  className,
}: LogoStackedProps) {
  return (
    <div
      className={`inline-flex justify-center items-center flex-col gap-2 ${className ?? ""} `}
    >
      <LogoMark className={`h-8 w-auto  ${markClassName ?? "shrink-0 h-12"}`} />

      <LogoWordmark className={wordmarkClassName ?? "h-7  shrink-0 ml-4"} />
    </div>
  );
}
