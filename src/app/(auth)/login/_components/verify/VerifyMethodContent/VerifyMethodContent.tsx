import { LoginMethod } from "@/types/auth/login/login.type";
import PasskeyContent from "@/app/(auth)/login/_components/verify/VerifyMethodContent/PasskeyContent";
import PasswordContent from "@/app/(auth)/login/_components/verify/VerifyMethodContent/PasswordContent";
import VerifyMethodFooter from "@/app/(auth)/login/_components/verify/VerifyMethodContent/VeifyMethodFooter";

type VerifyMethodContentProps = {
  navigateFn: () => void;
  selectedMethod: LoginMethod;
  className?: string;
  onResponseResolve: (
    isSuccess: boolean,
    setIsFetching: (state: boolean) => void,
  ) => void;
};

const VerifyMethodContent = ({
  selectedMethod,
  navigateFn,
  onResponseResolve,
}: VerifyMethodContentProps) => {
  const isPasskey = selectedMethod === "passkey";
  const isPassword = selectedMethod === "password";
  const isSecurtyCode = selectedMethod === "security_code";
  const isSessionApproval = selectedMethod === "session_approval";
  const Content = isPasskey ? (
    <PasskeyContent
      navigateFn={navigateFn}
      onResponseResolve={onResponseResolve}
    />
  ) : (
    <PasswordContent />
  );

  return (
    <div className="box-border flex flex-col pl-5">
      {Content}
      <VerifyMethodFooter onClick={navigateFn} />
    </div>
  );
};

export default VerifyMethodContent;
