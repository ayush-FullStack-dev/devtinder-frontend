import LeftPanel from "@/app/(auth)/login/_components/identify/LeftPanel";
import RightPanel from "@/app/(auth)/login/_components/identify/RightPanel";

const IdentifyFormSection = () => {
  return (
    <main
      className="
        w-full
        overflow-x-hidden
        overflow-y-auto
        py-3
        min-h-dvh
        xl:px-[1.4vw]
        flex
        items-center
        justify-start
        md:justify-center
        xl:justify-start
        relative
      "
    >
      <div className="relative">
        <div className="relative z-10">
          <LeftPanel />
        </div>

        <div className="hidden xl:block absolute top-0 left-4/4 z-1 w-auto">
          <RightPanel />
        </div>
      </div>
    </main>
  );
};

export default IdentifyFormSection;