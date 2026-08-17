import jakarta from "@/assets/fonts/font.jakarta";
import Link from "next/link";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const TermNotice = ({ className, linkClassName }: { className?: string; linkClassName?: string }) => {
  return (
    <div className={`flex gap-2 items-center text-sm w-full xs:w-70 ${className}`}>
      <IoShieldCheckmarkOutline size={50} color="var(--muted-foreground)" />
      <p
        className={`${jakarta.className} font-bold tracking-wide text-muted-foreground`}
      >
        By continuing, you agree to our{" "}
        <Link
          className={twMerge("tracking-tight text-link hover:text-link-hover font-medium",linkClassName)}
          href="/terms"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          className={twMerge("tracking-tight text-link hover:text-link-hover font-medium",linkClassName)}
          href="/privacy"
        >
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default TermNotice;
