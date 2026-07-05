import React from "react";

type props = {
  className?: string;
  icon: React.ReactNode;
};

const IconWithBg = ({ className, icon: Icon }: props) => {
  return (
    <div
      className={`flex items-center rounded-full p-2 h-auto w-auto ${className} text-[#4940e3]`}
    >
      {Icon}
    </div>
  );
};

export default IconWithBg;
