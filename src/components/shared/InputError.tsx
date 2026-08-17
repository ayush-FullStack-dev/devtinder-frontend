import React from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import type { IconType } from "react-icons";

type props = {
  input?: React.ReactNode;
  text: string | undefined;
  icon?: IconType;
  className?: string
};

const InputError = ({ className, text, icon }: props) => {
  const Icon = icon || IoInformationCircleOutline;
  return (
    <div className={`flex items-center gap-1 ${className || ""}`}>
      <Icon color="var(--danger)" />
      <p className="text-danger">{text}</p>
    </div>
  );
};

export default InputError;
