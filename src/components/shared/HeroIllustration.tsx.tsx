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
        width={image.width}
        height={image.height}
        className={`select-none pointer-events-none ${className}`}
        draggable={false}
      />
    </div>
  );
};

export default HeroIllustration;
