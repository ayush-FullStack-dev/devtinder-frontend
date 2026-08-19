import HeroIllustration from "@/components/shared/HeroIllustration";
import PromoContent from "@/components/shared/Promo-content";
import HeroIllustraionSvg from "@/../public/images/ DeveloperDashboardIllustration.png";

const RigthPanel = () => {
  const title = `Find your\nperfect `;

  const description = `Connect, collaborate and grow
your network with developers who build the future.`;

  const className = `
    relative
    overflow-hidden
    box-border
    gap-2
    p-10
    pb-3
    -ml-10
    inline-flex
    h-[95dvh]
    w-[57vw]
    flex-col
    rounded-2xl

    bg-[#f1f1f2]
    border
    border-[#dedee1]

    shadow-[0_20px_60px_rgba(24,24,27,0.08)]

    dark:bg-[#181a19]
    dark:border-white/[0.08]
    dark:shadow-[0_20px_80px_rgba(0,0,0,0.55)]
  `;

  return (
    <div
      className={`
        ${className}
        relative
        min-h-160
        h-[95dvh]
        -z-2
      `}
    >
      <PromoContent
        title={
          <>
            {title}
            <span className="text-green-brand">developer</span> match.
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
        "
      >
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