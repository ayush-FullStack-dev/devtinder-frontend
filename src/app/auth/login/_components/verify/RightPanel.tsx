import FeatureItem from "@/components/shared/FeatureItem";
import HeroIllustration from "@/components/shared/HeroIllustration";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import Header from "@/components/shared/Header";
import SecurityIllustration from "@/../public/images/SecurityIllustration.png";
import DecorativeCurve from "@/../public/images/DecorativeCurve.svg";

const RightPanel = () => {
  const styleClassName = `
   bg-[#e8e8e8]
    dark:bg-[#181a19]
  `;

  return (
    <div
      className={`
        relative
        z-10
        h-[96dvh]
        min-h-175
        w-[52vw]
        xl:w-[50vw]
        overflow-hidden
        box-border
        -ml-5
        rounded-2xl
        ${styleClassName}
      `}
    >
      <DecorativeCurve
        className="
          absolute
          -z-1
          h-130
          -top-4
          -left-4
          opacity-10
          dark:opacity-20
        "
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <HeroIllustration
          image={SecurityIllustration}
          className="w-[36em] h-auto mr-10"
        />

        <Header
          title="Your Security, Our Priority"
          description="We use multiple secure methods to make sure only you can access your account."
          className="-mt-20 mr-auto ml-auto"
        />

        <div className="mt-2 flex flex-col gap-3">
          <FeatureItem
            title="Passkey Authentication"
            description="Sign in securely using your device's built-in authentication."
            icon={HiOutlineShieldCheck}
          />

          <FeatureItem
            title="Protected Sessions"
            description="Only verified devices can access your account sessions."
            icon={HiOutlineShieldCheck}
          />

          <FeatureItem
            title="Account Recovery"
            description="Recover access anytime using your backup security methods."
            icon={HiOutlineShieldCheck}
          />
        </div>
      </div>
    </div>
  );
};

export default RightPanel;