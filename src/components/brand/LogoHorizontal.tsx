import LogoMark from "@/components/brand/LogoMark";
import LogoWordmark from "@/components/brand/LogoWordmark";

type LogoHorizontalProps = {
  markClassName?: string;
  wordmarkClassName?: string;
  className?: string;
};

export default function LogoHorizontal({
  markClassName,
  wordmarkClassName,
  className,
}: LogoHorizontalProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <LogoMark
        className={`h-6 w-auto  ${markClassName ?? "shrink-0 size-8"}`}
      />

      <LogoWordmark className={wordmarkClassName ?? "h-8 w-auto shrink-0 "} />
    </div>
  );
}
