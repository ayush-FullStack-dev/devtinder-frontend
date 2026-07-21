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
  navigateFn = () => {}
}: VerifyMethodSelectorProps) => {

  const onClick = () => {
    setIsMethodConfirmed(true);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      onClick();
      setIsMethodConfirmed(true)
    }
    if(e.key === "Escape"){
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
    <div className={`flex flex-col gap-3 ml-10 ${className ?? ""}`}>
      <div className="flex flex-col mt-3 ">
        <RadioGroup
          value={selectedMethod}
          onValueChange={(value) => setSelectedMethod(value as LoginMethod)}
          className="flex flex-col gap-3"
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

      <PrimaryButton className="w-130 mt-5" text="Continue" onClick={onClick}  />
    </div>
  );
};

export default VerifyMethodSelector;
