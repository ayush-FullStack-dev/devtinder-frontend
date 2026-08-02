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
      className={`inline-flex h-15 w-90 items-center pl-2 xs:pl-4 rounded-lg gap-3 ${className}`}
      style={inputStyle}
    >
      <Icon size={24} color="var(--muted-foreground)" className="hidden xs:inline"/>

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
