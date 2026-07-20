import jakarta from "@/assets/fonts/font.jakarta";
import type { IconType } from "react-icons";
import type { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { useState } from "react";

type IconTextInputProps<T extends FieldValues> = {
  name: Path<T>;
  text: string;
  icon: IconType;
  register: UseFormRegister<T>;
  className?: string;
  error?: boolean | undefined;
  success?: boolean | undefined;
};

const IconTextInput = <T extends FieldValues>({
  name,
  text,
  icon,
  register,
  error = false,
  success = false,
  className,
}: IconTextInputProps<T>) => {
  const [isClicked, setIsClicked] = useState(false);
  const Icon = icon;
  const borderVal = error
    ? "2px solid #FF5C74"
    : success
      ? "2px solid #22C55E"
      : isClicked
        ? "2px solid #007bff"
        : "2px solid #ccc";

  const boxShadowVal = error
    ? "0 0 14px rgba(255, 92, 116, 0.25)"
    : success
      ? "0 0 14px rgba(34, 197, 94, 0.25)"
      : isClicked
        ? "0 0 14px rgba(56, 189, 248, 0.5)"
        : "0 0 0";

  const inputStyle = {
    border: borderVal,
    boxShadow: boxShadowVal,
    transition: "all 0.2s linear",
  };

  return (
    <div
      className={`inline-flex h-15 w-90 items-center pl-2 xs:pl-4 rounded-lg gap-3 opacity-75 ${className}`}
      style={inputStyle}
    >
      <Icon size={24} color="#929191" className="hidden xs:inline"/>

      <input
        {...register(name)}
        className={`h-full flex-1 bg-transparent text-[14.8px] tracking-wide outline-none ${jakarta.className}`}
        style={{ wordSpacing: "1px" }}
        id={name}
        placeholder={text}
        onFocus={() => setIsClicked(true)}
        onBlur={() => setIsClicked(false)}
      />

      <input className="hidden" />
    </div>
  );
};

export default IconTextInput;
