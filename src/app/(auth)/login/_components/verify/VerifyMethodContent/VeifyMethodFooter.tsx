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
    <div className="flex flex-col items-center justify-center gap-2 mb-2">

      <AppLoader loading={loading} />
      <SeparatorWithText text="or" />

      <ActionTile
        title="Use a difffrent method"
        icon={KeyRoundIcon}
        onClick={navigate}
        disabled={hasOnlyOneMethod}
      />

      {hasOnlyOneMethod ? (
        <p></p>
      ) : (
        <span className={`flex gap-1 items-center text-[14px] mt-3 mr-5`}>
          <GoShieldCheck size={20} color="var(--muted-foreground)" />
          <div
            className={`${googleSans.className} font-light tracking-wide text-muted-foreground`}
          >
            Having trouble?{" "}
            <span
              className="tracking-tight text-primary font-medium"
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
