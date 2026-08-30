import jakarta from "@/assets/fonts/font.jakarta";
import poppins from "@/assets/fonts/font.poppins";
import { IconComponent } from "@/types/icon.type";

type props = {
  title: string;
  description: string;
  className?: string;
  icon: IconComponent;
};

const FeatureItem = ({ className, title, description, icon: Icon }: props) => {
  return (
    <div className={`flex items-center gap-4`}>
      <Icon size={40} color="var(--primary)" className="-mt-3"/>
      <div className={`inline-flex flex-col ${className} justify-between `}>
        <h1 className={`text-[14px] ${poppins.className} font-lighter`}>{title}</h1>
        <p
          className={`text-foreground-muted ${jakarta.className} font-extralight text-[15px] w-55`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureItem;
