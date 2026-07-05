import LogoMark from "@/components/brand/LogoMark";

type appLoaderProps = {
  loading: boolean;
  className?: string;
};

const AppLoader = ({ className,loading}: appLoaderProps) => {
  return (
    <div
      className={loading ? `fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px] ${className ?? ""}` : "hidden" } 
    >
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />

        <div className="absolute inset-0 flex items-center justify-center rounded-full">
          <LogoMark monoChrome className="h-9 w-9" />
        </div>
      </div>
    </div>
  );
};

export default AppLoader;
