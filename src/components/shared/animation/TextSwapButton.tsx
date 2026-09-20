"use client";

import { ArrowRight } from "lucide-react";
import { animate, motion, useAnimationControls } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type TextSwapButtonProps = {
  text: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  animateAllowed?: boolean
};

const TextSwapButton = ({
  onClick,
  disabled,
  text,
  className,
  type = "button",
  animateAllowed = true
}: TextSwapButtonProps) => {
  const words = text.split(" ");
  const controls = useAnimationControls();
  const arrowControls = useAnimationControls();
  const isAnimating = useRef(false);
  const isArrowAnimating = useRef(false);

  const handleHover = async () => {
    if (!animateAllowed) return;

    if (isAnimating.current) {
      await controls.stop();
    }

    if (isArrowAnimating.current) {
      await arrowControls.stop();
    }

    isAnimating.current = true;
    isArrowAnimating.current = true;

    controls.set("rest");
    arrowControls.set("rest");

    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve());
    });

    controls.start("hover");
    await arrowControls.start("hover");

    isAnimating.current = false;
    isArrowAnimating.current = false;
  };

  const handleHoverEnd = async () => {
    if (!animateAllowed) return;

    await arrowControls.stop();
    await arrowControls.start("rest");
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onHoverStart={handleHover}
      onHoverEnd={handleHoverEnd}
      initial="rest"
      className={twMerge(
        "grid h-full w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] overflow-hidden cursor-pointer  disabled:cursor-not-allowed   disabled:opacity-50",
        className
      )}
    >
      <div className="flex h-full min-w-0 items-center justify-center overflow-hidden rounded-full bg-green-brand px-4 text-center text-lg">
        <div className="flex min-w-0 items-center gap-1">
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="relative grid shrink-0"
            >
              <motion.span
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
          initial={{ y: "0%" }}
          animate={arrowControls}
          variants={{
            rest: {
              y: "0%",
              transition: {
                duration: 0.90,
                ease: [0.16, 1, 0.3, 1],
              },
            },
            hover: {
              y: "-100%",
              transition: {
                duration: 0.90,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
        >
          <ArrowRight className="size-[42%]" />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: "100%" }}
          animate={arrowControls}
          variants={{
            rest: {
              y: "100%",
              transition: {
                duration: 0.90,
                ease: [0.16, 1, 0.3, 1],
              },
            },
            hover: {
              y: "0%",
              transition: {
                duration: 0.90,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
        >
          <ArrowRight className="size-[42%]" />
        </motion.div>
      </div>
    </motion.button>
  );
};

export default TextSwapButton;