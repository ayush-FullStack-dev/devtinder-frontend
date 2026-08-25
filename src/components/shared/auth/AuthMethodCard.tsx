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
  handleMethodConfirm?: () => void;
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
  handleMethodConfirm,
  activeCard = false,
  icon: Icon,
  method,
  recommend = false,
}: props) => {
  return (
    <div
      className={`cursor-pointer box-border flex h-[20%] w-full items-center justify-between rounded-lg border-2 p-5 ${activeCard
        ? "border-primary bg-surface shadow-float ring-2 ring-primary/10"
        : "border-border-primary bg-surface-elevated/50 shadow-soft hover:border-primary/40 hover:bg-surface-elevated/70"
        } ${className}`}
      onClick={onClick}
      onDoubleClick={() => activeCard && handleMethodConfirm?.()}
    >
      <div className="flex items-center gap-3 overflow-hidden ">
        <RadioGroupItem value={method} id={method} className="cursor-pointer" />

        <IconWithBg className="bg-primary/10 hidden xs:inline" icon={<Icon size={30} />} />

        <AuthMethodHeader
          title={recommend ? `${title} (Recommended)` : title}
          description={description}
        />
      </div>

      <FaAngleRight size={30} color={activeCard ? "var(--primary)" : ""} onClick={(e) => {
        e.stopPropagation();

        if (activeCard) {
          handleMethodConfirm && handleMethodConfirm()
        }
      }} />
    </div>
  );
};

export default AuthMethodCard;
