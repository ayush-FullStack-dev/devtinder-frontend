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

  const onClick = () => {
    setIsMethodConfirmed(true);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      onClick();
      setIsMethodConfirmed(true)
    }
    if (e.key === "Escape") {
      navigateFn()
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={`relative h-screen w-[98%] flex flex-col gap-3 overflow-hidden box-border pl-3 ${className ?? ""}`}>
      <div className="w-full  flex flex-col shrink h-full">
        <RadioGroup
          value={selectedMethod}
          onValueChange={(value) => setSelectedMethod(value as LoginMethod)}
          className="flex flex-col gap-5 h-[80%]"
        >
          {loginVerfiyMethods?.map((method) => {
            const element = loginMethodDetails[method];

            if (method === "trusted_session") return;

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
                recommend={recommend}
              />
            );
          })}
        </RadioGroup>
      </div>

      <PrimaryButton text="Continue" onClick={onClick} className="w-full absolute bottom-5 left-0 right-0" />

    </div>
  );
};

export default VerifyMethodSelector;
