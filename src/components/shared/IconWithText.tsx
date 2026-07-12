import React from "react";
import { Clock } from "lucide-react";
import { googleSans } from "@/assets/fonts/font.google";

type IconWithTextProps = {
  icon: React.ReactNode;
  title: string;
  className?: string;
};

const IconWithText = ({ icon: Icon, title, className }: IconWithTextProps) => {
  return (
    <span className={`flex items-center gap-2 ${className ? className : ""}`}>
      {Icon}
      <p className={`${googleSans.className} font-semibold`}>{title}</p>
    </span>
  );
};

export default IconWithText;
