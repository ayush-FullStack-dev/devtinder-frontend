import { googleSans, googleSansFlex } from "@/assets/fonts/font.google"
import { twMerge } from "tailwind-merge"

type SignupProgressProps = {
    currentStep: number
    finalStep: number
    className?: string
}

const SignupProgress = ({
    className,
    currentStep,
    finalStep,
}: SignupProgressProps) => {
    const progress = (currentStep / finalStep) * 100;

    return (
        <div
            className={twMerge(
                `flex flex-col gap-2 text-green-primary ${googleSansFlex.className}`,
                className
            )}
        >
            <span>{`Step ${currentStep} of ${finalStep}`}</span>

            <div className="h-2 w-full overflow-hidden rounded-md bg-[#d4dae0] dark:bg-[#242426]">
                <div
                    className="h-full rounded-md bg-green-dark transition-[width] duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};
export default SignupProgress