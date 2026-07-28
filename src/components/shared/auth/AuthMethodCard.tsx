import { RadioGroupItem } from "@/components/ui/radio-group";
import IconWithBg from "@/components/shared/auth/IconWithBg";
import AuthMethodHeader from "@/components/shared/auth/AuthMethodHeader";
import { FaAngleRight } from "react-icons/fa6";
import React from "react";

type props = {
  title: string;
  description: string;
  className?: string;
  onClick?: () => void;
  activeCard?: boolean;
  icon: React.ElementType;
  method: string;
  recommend?: boolean;
};

const AuthMethodCard = ({
  title,
  description,
  className,
  onClick,
  activeCard = false,
  icon: Icon,
  method,
  recommend = false,
}: props) => {
  return (
    <div
      className={`box-border flex h-auto w-full items-center justify-between rounded-lg border-2 bg-transparent p-5 ml-2 mr-2 ${activeCard ? "border-[#6e68d2]" : ""
        } ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <RadioGroupItem value={method} id={method} />

        <IconWithBg className="bg-[#e5e4fc] hidden xs:inline" icon={<Icon size={30} />} />

        <AuthMethodHeader
          title={recommend ? `${title} (Recommended)` : title}
          description={description}
        />
      </div>

      <FaAngleRight size={30} color={activeCard ? "#625af2" : ""} />
    </div>
  );
};

export default AuthMethodCard;
