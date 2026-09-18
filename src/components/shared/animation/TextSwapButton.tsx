"use client";

import { ArrowRight } from "lucide-react";
import { motion, useAnimationControls } from "motion/react";
import React, { useRef } from "react";
import { twMerge } from "tailwind-merge";

type TextSwapButtonProps = {
  text: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const TextSwapButton = ({
  onClick,
  disabled,
  text,
  className,
  type = "button",
}: TextSwapButtonProps) => {
  const words = text.split(" ");
  const controls = useAnimationControls();
  const isAnimating = useRef(false);

  const handleHover = async () => {
    if (isAnimating.current) return;

    isAnimating.current = true;

    controls.set("rest");
    await controls.start("hover");

    isAnimating.current = false;
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onHoverStart={handleHover}
      initial="rest"
      whileHover="hover"
      className={twMerge(
        "grid h-full w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] overflow-hidden",
        className
      )}
    >
      <div className="flex h-full min-w-0 items-center rounded-full justify-center overflow-hidden bg-green-brand px-4 text-center text-lg">
        <div className="flex min-w-0 items-center gap-1 overflow-hidden">
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="relative grid shrink-0 overflow-hidden"
            >
              <motion.span
                custom={index}
                initial={{ y: "0%" }}
                animate={controls}
                variants={{
                  rest: { y: "0%" },
                  hover: {
                    y: "-130%",
                    transition: {
                      duration: 0.45,
                      delay: index * 0.055,
                      ease: [0.76, 0, 0.24, 1],
                    },
                  },
                }}
                className="col-start-1 row-start-1"
              >
                {word}
              </motion.span>

              <motion.span
                custom={index}
                initial={{ y: "130%" }}
                animate={controls}
                variants={{
                  rest: { y: "130%" },
                  hover: {
                    y: "0%",
                    transition: {
                      duration: 0.6,
                      delay: 0.45 + index * 0.055,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                className="col-start-1 row-start-1"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative h-full aspect-square overflow-hidden rounded-full bg-green-brand">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          variants={{
            rest: { y: "0%" },
            hover: { y: "-100%" },
          }}
          transition={{
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <ArrowRight className="size-5" />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          variants={{
            rest: { y: "100%" },
            hover: { y: "0%" },
          }}
          transition={{
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <ArrowRight className="size-5" />
        </motion.div>
      </div>
    </motion.button>
  );
};

export default TextSwapButton;