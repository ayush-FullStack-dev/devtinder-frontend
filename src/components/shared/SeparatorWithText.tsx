import { Separator } from "@/components/ui/separator";

type props = {
  text: string;
  className?: string;
};

const SeparatorWithText = ({ text, className = "" }: props) => (
  <div className={`w-full`}>
    <div className={`relative flex items-center gap-2 ${className}`}>
      <Separator className="flex-1 bg-[var(--border-secondary)]" />
      <span className="shrink-0 px-2 text-muted-foreground text-sm">
        {text}
      </span>
      <Separator className="flex-1 bg-[var(--border-secondary)]" />
    </div>
  </div>
);

export default SeparatorWithText;
