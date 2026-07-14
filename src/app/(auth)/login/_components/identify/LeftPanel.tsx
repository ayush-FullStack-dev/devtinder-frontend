import { LoginFormIdentfy } from "@/app/(auth)/login/_components/identify/LoginForm";
import AuthHeader from "@/components/shared/auth/login/IdentifyLoginHeader";
import SeparatorWithText from "@/components/shared/SeparatorWithText";
import IconTextButton from "@/components/shared/IconTextButton";
import { FaRegUser } from "react-icons/fa6";
import TermNotice from "@/components/shared/auth/TermsNotice";
import LogoStacked from "@/components/brand/LogoStacked";
import LogoHorizontal from "@/components/brand/LogoHorizontal";

const LeftPanel = () => {
  return (
    <div
      className="
        box-border gap-2 p-3 md:p-10 pb-3
        inline-flex flex-col items-stretch

        w-full max-w-130
        max-h-130
        min-h-[95vh]

        rounded-none md:rounded-xl

        bg-white dark:bg-zinc-900
        border border-slate-200 dark:border-zinc-800

        shadow-none md:shadow-lg
        dark:md:shadow-2xl dark:md:shadow-black/30
      "
    >
      <LogoHorizontal />

      <div className="mb-7" />

      <AuthHeader />

      <div className="mb-3" />

      <LoginFormIdentfy />

      <SeparatorWithText className="mb-5" text="Or" />

      <IconTextButton
        href="/signup"
        text="Create an Account"
        icon={FaRegUser}
        className="mb-5 h-15 w-auto"
      />

      <TermNotice className="mx-0 md:mx-7 ml-5" />
    </div>
  );
};

export default LeftPanel;
