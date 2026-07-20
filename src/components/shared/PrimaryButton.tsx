import React, { useRef } from "react";
import type { IconType } from "react-icons";
import { FaArrowRight } from "react-icons/fa6";
import { Loader2 } from "lucide-react";

type props = {
  text: string;
  icon?: IconType;
  onClick?: () => void;
  btnType?: "button" | "submit" | "reset";
  className?: string;
  disbaled?: boolean;
  disbaleText?: string;
};

const PrimaryButton = ({
  text,
  icon,
  onClick,
  className,
  btnType = "button",
  disbaled = false,
  disbaleText = "Checking...",
}: props) => {
  const Icon = icon || FaArrowRight;
  const pressStartTime = useRef<number>(0);

  const pressEffect = (e: React.MouseEvent<HTMLButtonElement>): void => {
    pressStartTime.current = Date.now();

    const style = e.currentTarget.style;
    style.transform = "scale(0.96)";
    style.transition = "transform 0.2s linear";
  };

  const unpressEffect = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (!pressStartTime.current) return;

    const pressDuration = Date.now() - pressStartTime.current;
    pressStartTime.current = 0;

    const style = e.currentTarget.style;
    style.transform = "scale(1)";
    style.transition =
      pressDuration > 150
        ? "transform 0.4s ease-in-out"
        : "transform 0.8s ease-in-out";
  };

  return (
    <button
      type={btnType}
      className={`box-border inline-flex h-14 w-90 pr-5 items-center  rounded-lg bg-[#4940e3]  cursor-pointer ${className} ${disbaled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      onClick={onClick}
      onMouseDown={pressEffect}
      onMouseUp={unpressEffect}
      onMouseLeave={unpressEffect}
      disabled={disbaled}
    >
      <p
        className={`font-extrabold text-lg flex-1 text-center tracking-wide text-white`}
      >
        {disbaled ? disbaleText : text}
      </p>
      {disbaled ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Icon size="25" color="white" className="ml-auto" />
      )}
    </button>
  );
};

export default PrimaryButton;
