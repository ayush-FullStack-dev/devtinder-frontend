import { LoginFormIdentfy } from "@/app/(auth)/login/_components/identify/LoginForm";
import AuthHeader from "@/components/shared/auth/login/IdentifyLoginHeader";
import SeparatorWithText from "@/components/shared/SeparatorWithText";
import IconTextButton from "@/components/shared/IconTextButton";
import { FaRegUser } from "react-icons/fa6";
import TermNotice from "@/components/shared/auth/TermsNotice";
import LogoHorizontal from "@/components/brand/LogoHorizontal";

const LeftPanel = () => {
  return (
    <div
      className="
      justify-around
  box-border
  flex flex-col 
  gap-4
  w-screen
  md:w-[80vw]
  lg:w-full

  p-6 md:p-8

  h-screen
  md:h-[95vh]

  rounded-none md:rounded-xl

  bg-white dark:bg-zinc-900
  border border-slate-200 dark:border-zinc-800

  shadow-none md:shadow-lg
  dark:md:shadow-2xl dark:md:shadow-black/30
"
    >
      <LogoHorizontal className="mb-0 lg:mb-6"/>

      <AuthHeader />


      <LoginFormIdentfy />

      <SeparatorWithText text="Or" />

      <IconTextButton
        href="/signup"
        text="Create an Account"
        icon={FaRegUser}
        className="mr-auto ml-auto h-15 w-full"
      />

      <TermNotice className="ml-auto mr-auto" />
    </div>
  );
};

export default LeftPanel;
