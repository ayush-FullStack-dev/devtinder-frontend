import HeroIllustration from "@/components/shared/HeroIllustration";
import PromoContent from "@/components/shared/Promo-content";
import HeroIllustraionSvg from "@/../public/images/ DeveloperDashboardIllustration.png";

import DecorativeCurves from "@/components/shared/DecorativeCurves";

const RigthPanel = () => {
  const title = `Find your\nperfect `;
  const description = `Connect, collaborate and grow\nyour network with developers who build the future.`;
  const className = `
relative overflow-hidden
box-border gap-2 p-10 pb-3 -ml-10
inline-flex h-[95dvh]
w-[57vw]
flex-col rounded-2xl

bg-linear-to-br
from-[(--grad-showcase-from)]
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
      className={`
    ${className}
    relative
    overflow-hidden
    -z-2
  `}
    >
      <PromoContent
        title={
          <>
            {title}
            <span className="text-violet-500">developer</span> match.
          </>
        }
        className="
      ml-15
      mt-5
      font-semibold
      relative
      z-10
    "
        description={description}
      />

      <div
        className="   
   inset-0
      overflow-hidden
      pointer-events-none
      right-3.5
      xl:right-[9%]
      2xl:right-[1%]
      hidden
      xl:block
    "
      >
        <DecorativeCurves className="opacity-20"
        />

        <HeroIllustration
          image={HeroIllustraionSvg}
          className="
        absolute
       right-5
        w-[45%]
        max-w-300
        md:w-[40%]
        lg:w-[82%]
        translate-x-[5%]
        translate-y-[2%]
        h-auto
      "
        />
      </div>
    </div>
  );
};

export default RigthPanel;
