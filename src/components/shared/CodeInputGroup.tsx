import React, { useEffect, useRef, useState } from "react";
import CodeInput from "@/components/shared/CodeInput";
import InputError from "@/components/shared/InputError";
import { Separator } from "@/components/ui/separator";

type CodeInputGroupProps = {
  length: number;
  onChange: (value: string) => void;
  separatorAfter?: number;
  error?: {
    success: boolean;
    message: string;
  } | null;
  success?: boolean;
  className?: string;
};

const CodeInputGroup = ({
  length,
  onChange,
  success,
  error = null,
  className,
  separatorAfter = 0,
}: CodeInputGroupProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [code, setCode] = useState(Array(length).fill(""));

  const focusInput = (index: number) => {
    const input = inputRefs.current[index];

    if (!input) return;

    input.focus();

    requestAnimationFrame(() => {
      const len = input.value.length;
      input.setSelectionRange(len, len);
    });
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    startIndex: number,
  ) => {
    e.preventDefault();

    const pasted = e.clipboardData.getData("text");

    const chars = pasted.slice(0, length - startIndex).split("");

    const newCode = [...code];

    chars.forEach((char, i) => {
      newCode[startIndex + i] = char;
    });

    setCode(newCode);

    const lastIndex = Math.min(startIndex + chars.length - 1, length - 1);

    focusInput(lastIndex);
  };

  useEffect(() => {
    onChange(code.join(""));
  }, [code, onChange]);

  return (
    <div className={`flex flex-col ${className} mt-4 w-full`}>
      <div className={`flex flex-wrap  gap-2`}>
        {code.map((value, index) => (
          <React.Fragment key={index}>
            <CodeInput
              className="w-14 xs:w-16 sm:w-16 md:w-15 lg:w-13 shrink-0"
              index={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              value={value}
              success={success === undefined ? value !== "" : success}
              error={!!error}
              setValue={(val) => {
                const newCode = [...code];
                newCode[index] = val;
                setCode(newCode);

                if (val && index < length - 1) {
                  focusInput(index + 1);
                }
              }}
              onPaste={(e) => handlePaste(e, index)}
              onKeyDown={(e) => {
                if (
                  e.key === "ArrowUp" ||
                  (e.key === "ArrowLeft" && index > 0)
                ) {
                  e.preventDefault();
                  focusInput(index - 1);
                }

                if (
                  e.key === "ArrowDown" ||
                  (e.key === "ArrowRight" && index < length - 1)
                ) {
                  e.preventDefault();
                  focusInput(index + 1);
                }

                if (e.key === "Backspace" && !code[index] && index > 0) {
                  e.preventDefault();
                  focusInput(index - 1);
                }
              }}
            />

            {separatorAfter === index && (
              <span className="h-0.5 w-2 mt-auto mb-auto mr-1 ml-1 shrink-0 rounded-full bg-muted-foreground hidden md:inline" />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="h-3 mt-4">
        {!!error ? <InputError text={error.message} /> : null}
      </div>
    </div>
  );
};

export default CodeInputGroup;
