import jakarta from "@/assets/fonts/font.jakarta";
import poppins from "@/assets/fonts/font.poppins";
import { IconComponent } from "@/types/icon.type";
import { twMerge } from "tailwind-merge";

type Props = {
  title: string;
  description: string;
  className?: string;

  icon: IconComponent;
  iconColor?: string;
  iconClassName?: string;
  iconWrapperClassName?: string;

  descriptionColor?: string;
};

const FeatureItem = ({
  className,
  title,
  description,
  icon: Icon,
  iconColor = "var(--primary)",
  iconClassName,
  iconWrapperClassName,
  descriptionColor = "var(--foreground-muted)",
}: Props) => {
  return (
    <div className={twMerge("flex items-center gap-4", className)}>
      <div
        className={twMerge(
          "shrink-0 flex justify-center items-center",
          iconWrapperClassName
        )}
      >
        <Icon
          size={40}
          color={iconColor}
          className={iconClassName}
        />
      </div>

      <div className="inline-flex flex-col justify-between">
        <h1
          className={`${poppins.className} text-[14px] font-light`}
        >
          {title}
        </h1>

        <p
          className={`${jakarta.className} w-55 text-[15px] font-extralight`}
          style={{ color: descriptionColor }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureItem;