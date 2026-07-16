import Image from "next/image";
import space from "@/../public/images/space-terrain.png";

const HeroSection = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Image
        src={space}
        alt="space terrain"
        className="w-180 opacity-95 select-none pointer-events-none"
        draggable={false}
        aria-hidden="true"
        priority
      />
    </div>
  );
};

export default HeroSection;
