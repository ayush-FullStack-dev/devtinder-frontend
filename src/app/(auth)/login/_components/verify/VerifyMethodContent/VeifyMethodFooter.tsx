import ActionTile from "@/components/shared/ActionTile";
import SeparatorWithText from "@/components/shared/SeparatorWithText";
import { KeyRoundIcon } from "lucide-react";
import { GoShieldCheck } from "react-icons/go";
import { googleSans } from "@/assets/fonts/font.google";
import AppLoader from "@/components/shared/Loader/AppLoader";
import { useState } from "react";
import { useLoginStore } from "@/store/login.store";

type VerifyMethodFooterProps = {
  onClick: () => void;
  className?: string;
};

const VerifyMethodFooter = ({
  onClick: navigateFn,
  className,
}: VerifyMethodFooterProps) => {
  const allowedMethodLength = useLoginStore((state) => state.loginIdentifyInfo)
    ?.allowedMethod?.length;

  const hasOnlyOneMethod = allowedMethodLength
    ? allowedMethodLength <= 1
    : false;

  const [loading, setloading] = useState(false);

  const navigate = () => {
    if (!hasOnlyOneMethod) {
      setloading(true);
      setTimeout(navigateFn, 500);
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-2">
      <AppLoader loading={loading} />
      <SeparatorWithText className="w-140" text="or" />
      <ActionTile
        title="Use a difffrent method"
        icon={KeyRoundIcon}
        onClick={navigate}
        className="w-140"
        disabled={hasOnlyOneMethod}
      />

      {hasOnlyOneMethod ? (
        <p></p>
      ) : (
        <span className={`flex gap-1 items-center text-[14px] m-auto ml-27`}>
          <GoShieldCheck size={20} color="#929191" />
          <div
            className={`${googleSans.className} font-light tracking-wide text-[#7c8999]`}
          >
            Having trouble?{" "}
            <span
              className="tracking-tight text-[#9569e7] font-medium"
              onClick={navigate}
            >
              Try another sign-in option.
            </span>
          </div>
        </span>
      )}
    </div>
  );
};

export default VerifyMethodFooter;
