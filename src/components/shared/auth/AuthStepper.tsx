import { googleSans } from "@/assets/fonts/font.google";
import jakarta from "@/assets/fonts/font.jakarta";
import { Separator } from "@/components/ui/separator";
import { Circle } from "lucide-react";
import { CiCircleCheck } from "react-icons/ci";

type props = {
  currentStep: number;
  steps: [string,string];
  className?: string
};

const AuthStepper = ({ currentStep,steps,className }: props) => {
  return (
    <div className={`flex gap-2 p-8 box-border items-center w-full ${className}`}>
      <span>
        <CiCircleCheck  size={35} className="text-primary/80 font-semibold dark:text-muted-foreground"/>
        <p className={`text-xs ${googleSans.className} text-muted-foreground`}>{steps[0]}</p>
      </span>

      <Separator className="flex-1 mb-4 outline-1 bg-primary/50 dark:bg-muted-foreground/40" />

      <span>
        <span className="relative inline-flex items-center justify-center">
          <Circle size={35} fill="var(--primary)" color="var(--primary)" />

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
