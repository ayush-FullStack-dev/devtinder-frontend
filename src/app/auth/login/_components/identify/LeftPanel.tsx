import { LoginFormIdentfy } from "@/app/auth/login/_components/identify/LoginForm";
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
    bg-[#e8e8e8]
    dark:bg-[#181a19]
  "
    >
      <div className="
flex flex-col
 gap-7
 w-full h-full min-h-50 max-h-160
 px-4 xs:px-4 sm:px-5 justify-between
 py-2
">


        <div className="flex flex-col gap-[9vh]">
          <LogoHorizontal className="mt-6 " monoChrome={true} />
          <div className="flex flex-col w-full gap-[6vh]">
            <AuthHeader />

            <LoginFormIdentfy />
          </div>
        </div>
      </div>
      <div className="px-2 flex flex-col gap-4 mt-auto mb-2 w-full">
        <IconTextButton
          href="/auth/signup"
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