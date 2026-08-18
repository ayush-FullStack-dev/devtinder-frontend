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
    relative
    md:static
    flex flex-col
    justify-evenly
    w-screen
    md:w-[85vw]
    xl:w-[43vw]
h-dvh
    md:h-[95dvh]
    min-h-155
    rounded-none md:rounded-xl
    bg-surface
    border border-border-primary
    shadow-none md:shadow-card
  "
    >
      <div className="
flex flex-col
 gap-6
 w-full h-full min-h-50 max-h-160
 px-3 xs:px-4 sm:px-5 justify-evenly 
">

        <LogoHorizontal className="mt-2 lg:mb-5" monoChrome={true} />

        <AuthHeader />

        <LoginFormIdentfy />
      </div>
      <div className="px-2 flex flex-col gap-4 mt-auto mb-2 w-full">
        <SeparatorWithText text="Or" className="w-full" />

        <IconTextButton
          href="/signup"
          text="Create an Account"
          icon={FaRegUser}
          className="mr-auto ml-auto h-15 w-full"
        />

        <TermNotice className="ml-auto mr-auto" />
      </div>
    </div>
  );
};

export default LeftPanel;