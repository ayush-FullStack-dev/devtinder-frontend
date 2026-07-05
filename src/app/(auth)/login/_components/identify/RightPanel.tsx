import HeroIllustration from "@/components/shared/HeroIllustration.tsx";
import PromoContent from "@/components/shared/Promo-content";
import HeroIllustraionSvg from "@/../public/images/ DeveloperDashboardIllustration.png";

import DecorativeCurves from "@/components/shared/DecorativeCurves";

const RigthPanel = () => {
  const title = `Find your\nperfect `;
  const description = `Connect, collaborate and grow\nyour network with developers who build the future.`;
  const className = `
relative overflow-hidden
box-border gap-2 p-10 pb-3 -ml-10
inline-flex h-[95vh] w-230 flex-col rounded-2xl

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
    <div className={`${className} relative -z-2`}>
      <DecorativeCurves />
      <PromoContent
        title={
          <>
            {title}
            <span className="text-violet-500">developer</span> match.
          </>
        }
        className="ml-15 mt-5"
        description={description}
      />
      <HeroIllustration
        image={HeroIllustraionSvg}
        className="w-[730] h[1006] ml-40"
      />
    </div>
  );
};

export default RigthPanel;
