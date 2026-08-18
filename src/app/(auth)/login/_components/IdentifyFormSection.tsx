import LeftPanel from "@/app/(auth)/login/_components/identify/LeftPanel";
import RightPanel from "@/app/(auth)/login/_components/identify/RightPanel";

const IdentifyFormSection = () => {
  return (
    <main
      className="
       relative
        w-full
        min-h-dvh
        md:min-h-160
        overflow-x-hidden
        xl:px-[1.4vw]
        flex
        h-dvh
        items-start
        md:items-center
        justify-start
        md:justify-center
        xl:justify-start
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