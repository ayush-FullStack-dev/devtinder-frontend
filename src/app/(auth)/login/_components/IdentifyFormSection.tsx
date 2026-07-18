import LeftPanel from "@/app/(auth)/login/_components/identify/LeftPanel";
import RightPanel from "@/app/(auth)/login/_components/identify/RightPanel";

const IdentifyFormSection = () => {
  return (
    <main
      className="
    h-screen w-full
    overflow-hidden
    p-0 md:p-3 lg:pl-20
    bg-slate-100 dark:bg-zinc-950
    flex justify-center lg:justify-start
  "
    >
      <div className="relative w-full lg:w-auto">
        <div className="relative z-10">
          {" "}
          <LeftPanel />
        </div>

        <div className="absolute top-0 left-full z-1 hidden lg:block">
          {" "}
          <RightPanel />
        </div>
      </div>
    </main>
  );
};

export default IdentifyFormSection;
