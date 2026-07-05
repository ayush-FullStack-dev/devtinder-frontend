import Image, { StaticImageData } from "next/image";

type props = {
  image: StaticImageData;
  className?: string;
};

const HeroIllustration = ({ className, image }: props) => {
  return (
    <div>
      <Image
        src={image}
        alt="Developer Dashboard Illustration"
        priority
        className={`select-none
pointer-events-none w-${image.width} h-${image.height} ${className}`}
        draggable="false"
      />
    </div>
  );
};

export default HeroIllustration;
