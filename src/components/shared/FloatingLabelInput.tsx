import type {
  UseFormRegister,
  FieldValues,
  Path,
  UseFormWatch,
} from "react-hook-form";
import { useState } from "react";
import { googleSans } from "@/assets/fonts/font.google";

type FloatingLabelInputProps<T extends FieldValues> = {
  name: Path<T>;
  text: string;
  watch: UseFormWatch<T>;
  register: UseFormRegister<T>;
  className?: string;
  error?: boolean;
  success?: boolean;
  type?: string;
  endIcon?: React.ReactNode;
};

const FloatingLabelInput = <T extends FieldValues>({
  name,
  text,
  register,
  watch,
  error = false,
  success = false,
  className,
  endIcon,
  type = "text",
}: FloatingLabelInputProps<T>) => {
  const [isClicked, setIsClicked] = useState(false);

  const value = watch(name);
  const isFloating = isClicked || !!value;

  const borderVal = error
    ? "2px solid var(--danger)"
    : success
      ? "2px solid var(--success)"
      : "2px solid var(--input)";

  const inputStyle = {
    border: borderVal,
    boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.06)",
    transition: "all 0.2s linear",
  };

  const field = register(name);

  return (
    <div
      className={`relative inline-flex h-15 w-full items-center rounded-lg pl-4 gap-3 ${className ?? ""}`}
      style={inputStyle}
    >
      <label
        htmlFor={name}
        className={`
          pointer-events-none
          absolute
          left-4
          px-1
          z-5
          bg-background
          text-input-placeholder
          transition-all
          duration-200
          ${isFloating
            ? "-top-3 text-[14px]"
            : "top-1/2 -translate-y-1/2 text-[16px]"
          }
        `}
      >
        {text}
      </label>

      <input
        {...field}
        id={name}
        type={type}
        placeholder=""
        onFocus={() => {
          setTimeout(() => setIsClicked(true), 100);
        }}
        onBlur={(e) => {
          field.onBlur(e);

          setTimeout(() => setIsClicked(false), 100);
        }}
        className={`
          peer
          h-full
          w-full
          bg-transparent
          text-[14.8px]
          tracking-wide
          text-input-foreground
          placeholder:text-input-placeholder
          outline-none
          ${googleSans.className}
        `}
        autoComplete={
          name === "password"
            ? "new-password"
            : name === "confirmPassword"
              ? "new-password"
              : undefined
        }
        style={{
          wordSpacing: "1px",
        }}
      />

      {endIcon && (
        <div className="shrink-0 pr-4">
          {endIcon}
        </div>
      )}
    </div>
  );
};

export default FloatingLabelInput;