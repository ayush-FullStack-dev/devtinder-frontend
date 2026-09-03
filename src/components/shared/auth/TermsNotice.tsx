import jakarta from "@/assets/fonts/font.jakarta";
import Link from "next/link";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

type TermNoticeProps = {
  className?: string;
  linkClassName?: string;
};

const TermNotice = ({
  className,
  linkClassName,
}: TermNoticeProps) => {
  return (
    <div
      className={twMerge(
        "flex w-full items-center justify-center gap-3 text-sm",
        className,
      )}
    >
      <IoShieldCheckmarkOutline
        className="size-7 shrink-0 text-muted-foreground"
        aria-hidden="true"
      />

      <p
        className={twMerge(
          jakarta.className,
          "font-bold leading-relaxed tracking-wide text-muted-foreground",
        )}
      >
        By continuing, you agree to our{" "}
        <br />
        <Link
          href="/terms"
          className={twMerge(
            "font-medium tracking-tight text-link transition-colors hover:text-link-hover",
            linkClassName,
          )}
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className={twMerge(
            "font-medium tracking-tight text-link transition-colors hover:text-link-hover",
            linkClassName,
          )}
        >
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default TermNotice;