import FeatureItem from "@/components/shared/FeatureItem";
import HeroIllustration from "@/components/shared/HeroIllustration.tsx";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import Header from "@/components/shared/Header";
import SecurityIllustration from "@/../public/images/SecurityIllustration.png";
import DecorativeCurve from "@/../public/images/DecorativeCurve.svg";

const RightPanel = () => {
  const styleClassName = `
bg-linear-to-br
from-[#FCFBFF]
via-[#F6F4FF]
to-[#F0EEFF]

dark:from-[#181824]
dark:via-[#141420]
dark:to-[#101018]

border
border-[#E6E3F5]
dark:border-[#2A2A3A]

shadow-[0_20px_60px_rgba(0,0,0,0.08)]
dark:shadow-[0_20px_80px_rgba(0,0,0,0.55)]

before:absolute
before:inset-0
before:bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.08),transparent_40%)]

dark:before:bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.12),transparent_40%)]

before:pointer-events-none
`;

  return (
    <div
      className={`relative z-10 overflow-hidden
box-border gap-2 p-10 pb-3 -ml-5 
 h-[95vh] w-180 rounded-2xl inline-flex flex-col items-center
 ${styleClassName}`}
    >
      <DecorativeCurve className="absolute -z-1 h-130 mr-120 -top-4 opacity-55" />

      <HeroIllustration
        image={SecurityIllustration}
        className="w-[600] h[750] -ml-10 -mt-5"
      />
      <Header
        title="Your Securty, Our Priority"
        description="We use multiple secure method to make sure only you can access your account."
        className="-mt-20"
      />
      <div className="flex flex-col gap-4 mt-5">
        <FeatureItem
          title="Secure & Encrypted"
          description="Your data is protected with secure codebase."
          icon={HiOutlineShieldCheck}
        />
        <FeatureItem
          title="Secure & Encrypted"
          description="Your data is protected with secure codebase."
          icon={HiOutlineShieldCheck}
        />
        <FeatureItem
          title="Secure & Encrypted"
          description="Your data is protected with secure codebase."
          icon={HiOutlineShieldCheck}
        />
      </div>
    </div>
  );
};

export default RightPanel;
