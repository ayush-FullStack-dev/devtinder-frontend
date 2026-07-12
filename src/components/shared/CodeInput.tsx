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
        className={`h-15 w-13 rounded-lg flex items-center justify-center overflow-hidden ${className}`}
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
