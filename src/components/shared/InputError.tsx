import React from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import type { IconType } from "react-icons";

type props = {
  input?: React.ReactNode;
  text: string | undefined;
  icon?: IconType;
};

const InputError = ({ input, text, icon }: props) => {
  const Icon = icon || IoInformationCircleOutline;
  return (
    <div className="flex items-center gap-1">
      <Icon color="#F87171" />
      <p  className="text-[#F87171]">{text}</p>
    </div>
  );
};

export default InputError;
