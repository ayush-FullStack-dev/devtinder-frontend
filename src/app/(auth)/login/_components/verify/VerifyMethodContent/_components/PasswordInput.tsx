import jakarta from "@/assets/fonts/font.jakarta";
import type { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { useState } from "react";
import { CiLock } from "react-icons/ci";
import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps<T extends FieldValues> = {
  name: Path<T>;
  text: string;
  register: UseFormRegister<T>;
  className?: string;
  error?: boolean | undefined;
  success?: boolean | undefined;
  showPassword?: boolean;
  setShowPassword?: (state: boolean) => void;
};

const PasswordInput = <T extends FieldValues>({
  name,
  text,
  register,
  error = false,
  success = false,
  className,
  showPassword = true,
  setShowPassword = () => { },
}: PasswordInputProps<T>) => {
  const [isClicked, setIsClicked] = useState(false);
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
      className={`inline-flex w-90 items-center  rounded-lg gap-3 pl-4 opacity-75 ${className} pr-4`}
      style={inputStyle}
    >
      <CiLock size={24} color="#929191" />

      <input
        {...register(name)}
        autoComplete="off"
        className={`h-full flex-1 bg-transparent text-[14.8px] tracking-wide outline-none ${jakarta.className}`}
        style={{ wordSpacing: "1px" }}
        id={name}
        placeholder={text}
        type={showPassword ? "text" : "password"}
        onFocus={() => setIsClicked(true)}
        onBlur={() => setIsClicked(false)}
      />

      <Eye
        size={20}
        className={showPassword ? "hidden" : "inline"}
        onClick={() => setShowPassword(true)}
      />

      <EyeOff
        size={20}
        className={!showPassword ? "hidden" : "inline"}
        onClick={() => setShowPassword(false)}
      />

      <input className="hidden" />
    </div>
  );
};

export default PasswordInput;
