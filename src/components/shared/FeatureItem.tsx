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
    <div
      className={twMerge(
        "flex min-w-0 items-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-4",
        className
      )}
    >
      <div
        className={twMerge(
          "flex shrink-0 items-center justify-center",
          iconWrapperClassName
        )}
      >
        <Icon
          size={40}
          color={iconColor}
          className={twMerge("shrink-0", iconClassName)}
        />
      </div>

      <div className="min-w-0 inline-flex flex-col justify-between">
        <h1
          className={twMerge(
            `${poppins.className} font-light`,
            "text-[10px] sm:text-[11px] md:text-[12px] lg:text-[14px]"
          )}
        >
          {title}
        </h1>

        <p
          className={twMerge(
            `${jakarta.className} font-extralight`,
            "w-20 text-[9px] leading-tight sm:w-24 sm:text-[10px] md:w-32 md:text-[11px] lg:w-55 lg:text-[15px]"
          )}
          style={{ color: descriptionColor }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureItem;