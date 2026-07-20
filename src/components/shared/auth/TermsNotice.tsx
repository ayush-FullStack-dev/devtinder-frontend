import jakarta from "@/assets/fonts/font.jakarta";
import Link from "next/link";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

const TermNotice = ({ className }: { className?: string }) => {
  return (
    <div className={`flex gap-3 items-center text-sm w-full xs:w-70 ${className}`}>
      <IoShieldCheckmarkOutline size={55} color="#929191" />
      <p
        className={`${jakarta.className} font-bold tracking-wide text-[#929191]`}
      >
        By continuing, you agree to our{" "}
        <Link
          className="tracking-tight text-[#6860e6]  font-medium"
          href="/terms"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          className="tracking-tight text-[#6860e6] font-medium "
          href="/privacy"
        >
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default TermNotice;
