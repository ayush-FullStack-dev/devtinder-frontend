import FeatureItem from "@/components/shared/FeatureItem";
import HeroIllustration from "@/components/shared/HeroIllustration";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import Header from "@/components/shared/Header";
import SecurityIllustration from "@/../public/images/SecurityIllustration.png";
import DecorativeCurve from "@/../public/images/DecorativeCurve.svg";

const RightPanel = () => {
  const styleClassName = `
bg-linear-to-br
from-[var(--grad-showcase-from)]
via-[var(--grad-showcase-via)]
to-[var(--grad-showcase-to)]

border
border-[var(--grad-showcase-border)]

shadow-showcase

before:absolute
before:inset-0
before:[background-image:var(--grad-showcase-glow)]

before:pointer-events-none
`;

  return (
    <div
      className={`relative z-10 
   h-[96dvh] min-h-175 overflow-hidden
box-border gap-2 -ml-5
  w-[52vw] xl:w-[50vw] rounded-2xl 
 ${styleClassName}`}
    >
      <DecorativeCurve className="absolute -z-1 h-130 -top-4 opacity-55 -left-4" />
      <div className={`absolute inset-0 flex flex-col items-center justify-center`}>



        <HeroIllustration
          image={SecurityIllustration}
          className="w-[36em] h-auto mr-10"
        />

        <Header
          title="Your Securty, Our Priority"
          description="We use multiple secure method to make sure only you can access your account."
          className="-mt-20 mr-auto ml-auto"
        />

        <div className="flex flex-col gap-3 mt-2 " >
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