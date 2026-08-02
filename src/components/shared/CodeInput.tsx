import jakarta from "@/assets/fonts/font.jakarta";
import { forwardRef, useState } from "react";

type CodeInputProps = {
  value: string;
  setValue: (val: string) => void;
  index: number;
  onPaste: (e: any) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  success?: boolean;
  error?: boolean;
  className?: string;
};

const CodeInput = forwardRef<HTMLInputElement, CodeInputProps>(
  (
    {
      className,
      error = false,
      success = false,
      value,
      index,
      setValue,
      onPaste,
      onKeyDown,
    },
    ref,
  ) => {
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
          className={`h-13 md:h-14  rounded-lg flex items-center justify-center overflow-hidden ${className}`}
          style={inputStyle}
          key={index}
        >
          <input
            ref={ref}
            className={`w-full h-full bg-transparent outline-none text-center px-1 ${jakarta.className}`}
            maxLength={1}
            type="text"
            onPaste={onPaste}
            inputMode="numeric"
            value={value}
            onChange={(e) => {
              const val = e.target.value;
              setValue(val);
            }}
            onKeyDown={onKeyDown}
            placeholder={isClicked ? "" : "-"}
            onFocus={() => setIsClicked(true)}
            onBlur={() => setIsClicked(false)}
          />
      
      </div>
    );
  },
);

CodeInput.displayName = "CodeInput";

export default CodeInput;
