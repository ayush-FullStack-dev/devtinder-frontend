import { googleSans } from "@/assets/fonts/font.google";
import jakarta from "@/assets/fonts/font.jakarta";
import { Separator } from "@/components/ui/separator";
import { Circle } from "lucide-react";
import { CiCircleCheck } from "react-icons/ci";

type props = {
  currentStep: number;
  steps: [string, string];
  className?: string
};

const AuthStepper = ({ currentStep, steps, className }: props) => {
  return (
    <div className={`flex gap-2 p-3 items-center w-80 ${className}`}>
      <span>
        <CiCircleCheck size={35} className="text-[#a48be8] font-semibold dark:text-[#dcdfe6]" />
        <p className={`text-xs ${googleSans.className} text-[#7b7b7b] dark:text-[#dcdfe6]`}>{steps[0]}</p>
      </span>

      <Separator className="flex-1 mb-4 outline-1 bg-[#a48be8] dark:bg-[#dcdfe6] opacity-80" />

      <span>
        <span className="relative inline-flex items-center justify-center">
          <Circle size={35} fill="#4940e3" color="#4940e3" />

          <p className="absolute text-white text-sm font-medium">
            {currentStep}
          </p>
        </span>
        <p className={`text-xs ${jakarta.className}`}>{steps[1]}</p>
      </span>
    </div>
  );
};

export default AuthStepper;
