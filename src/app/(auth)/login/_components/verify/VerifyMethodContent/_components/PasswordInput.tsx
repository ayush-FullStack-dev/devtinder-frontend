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
  setShowPassword = () => {},
}: PasswordInputProps<T>) => {
  const [isClicked, setIsClicked] = useState(false);
  const borderVal = error
    ? "2px solid var(--danger)"
    : success
      ? "2px solid var(--success)"
      : isClicked
        ? "2px solid var(--primary)"
        : "2px solid var(--input)";

  const boxShadowVal = error
    ? "0 0 0 3px color-mix(in srgb, var(--danger) 10%, transparent)"
    : success
      ? "0 0 0 3px color-mix(in srgb, var(--success) 10%, transparent)"
      : isClicked
        ? "0 0 0 3px color-mix(in srgb, var(--primary) 12%, transparent)"
        : "0 0 0";

  const inputStyle = {
    border: borderVal,
    boxShadow: `inset 0 1px 2px rgba(0, 0, 0, 0.06), ${boxShadowVal}`,
    transition: "all 0.2s linear",
    background: "var(--surface-elevated)",
  };

  return (
    <div
      className={`inline-flex w-full items-center  rounded-lg gap-3 pl-4 ${className} pr-4`}
      style={inputStyle}
    >
      <CiLock size={24} color="var(--muted-foreground)" />

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
