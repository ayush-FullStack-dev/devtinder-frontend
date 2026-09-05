import AuthMethodCard from "@/components/shared/auth/AuthMethodCard";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { loginMethodDetails } from "@/constants/login";
import { RadioGroup } from "@/components/ui/radio-group";
import { LoginMethod } from "@/types/auth/login/login.type";
import { loginIdentifySuccessResponse } from "@/types/auth/login/loginIdenfity.type";
import { useEffect } from "react";

type VerifyMethodSelectorProps = {
  selectedMethod?: LoginMethod | undefined;
  setSelectedMethod: React.Dispatch<
    React.SetStateAction<LoginMethod | undefined>
  >;
  loginVerfiyMethods: LoginMethod[] | null;
  setIsMethodConfirmed: (state: boolean) => void;
  loginIdentifyInfo?: loginIdentifySuccessResponse | null;
  navigateFn?: () => void;
  className?: string;
};

const VerifyMethodSelector = ({
  selectedMethod,
  setSelectedMethod,
  loginVerfiyMethods,
  loginIdentifyInfo,
  className,
  setIsMethodConfirmed,
  navigateFn = () => { }
}: VerifyMethodSelectorProps) => {

  const handleMethodConfirm = () => {
    setIsMethodConfirmed(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleMethodConfirm();
      }

      if (e.key === "Escape") {
        navigateFn();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigateFn]);

  return (
    <div
      className={`relative h-dvh min-h-110 w-full flex flex-col gap-3 overflow-hidden box-border px-2 ${className ?? ""
        }`}
    >
      <div className="flex-1 min-h-0 w-full overflow-hidden">
        <RadioGroup
          value={selectedMethod}
          onValueChange={(value) => setSelectedMethod(value as LoginMethod)}
          className="h-full min-h-0 flex flex-col gap-3"
        >
          {loginVerfiyMethods?.map((method) => {
            const element = loginMethodDetails[method];

            if (method === "trusted_session") return null;

            const recommend =
              loginIdentifyInfo?.primaryMethod === "trusted_session" &&
                method === "passkey"
                ? true
                : loginIdentifyInfo?.primaryMethod === method;

            return (
              <AuthMethodCard
                key={method}
                method={method}
                icon={element.icon}
                title={element.title}
                description={element.description}
                activeCard={selectedMethod === method}
                onClick={() => setSelectedMethod(method)}
                handleMethodConfirm={handleMethodConfirm}
                recommend={recommend}
              />
            );
          })}
        </RadioGroup>
      </div>

      <div className="w-full shrink-0 pb-2">
        <PrimaryButton
          text="Continue"
          onClick={handleMethodConfirm}
          className="w-full"
        />
      </div>

    </div>
  );
};

export default VerifyMethodSelector;