import Image from "next/image";
import space from "@/../public/images/space-terrain.png"

const HeroSection = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        alt="space terrain"
        src="/images/space-terrain.png"
        className="w-180  opacity-95 select-none pointer-events-none"
        draggable={false}
        aria-hidden="true"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
};

export default HeroSection;
