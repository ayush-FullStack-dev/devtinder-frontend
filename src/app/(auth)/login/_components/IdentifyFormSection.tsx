import LeftPanel from "@/app/(auth)/login/_components/identify/LeftPanel";
import RightPanel from "@/app/(auth)/login/_components/identify/RightPanel";

const IdentifyFormSection = () => {
  return (
    <main
      className="
 h-screen w-full
overflow-hidden
p-0
lg:px-[1%]
xl:px-[2%]
2xl:px-[5%]
bg-slate-100 dark:bg-zinc-950
flex
items-center
justify-start
md:justify-center
lg:justify-start
  "
    >
      <div className="relative">
        <div className="relative z-10">
          {" "}
          <LeftPanel />
        </div>

        <div className="hidden lg:inline absolute top-0 left-4/4 z-1 w-auto">
          {" "}
          <RightPanel />
        </div>
      </div>
    </main>
  );
};

export default IdentifyFormSection;
