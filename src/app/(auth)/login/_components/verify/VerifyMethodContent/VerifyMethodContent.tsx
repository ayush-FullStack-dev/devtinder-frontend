import { LoginMethod } from "@/types/auth/login/login.type";
import PasskeyContent from "@/app/(auth)/login/_components/verify/VerifyMethodContent/PasskeyContent";
import PasswordContent from "@/app/(auth)/login/_components/verify/VerifyMethodContent/PasswordContent";
import VerifyMethodFooter from "@/app/(auth)/login/_components/verify/VerifyMethodContent/VeifyMethodFooter";
import SecurityCodeContent from "./SecurityCodeContent";
import SessionApprovalContent from "./SessionApprovalContent";

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
  ) : isPassword ? (
    <PasswordContent onResponseResolve={onResponseResolve} />
  ) : isSecurtyCode ? (
    <SecurityCodeContent onResponseResolve={onResponseResolve} />
  ) : isSessionApproval ? (
    <SessionApprovalContent onResponseResolve={onResponseResolve} />
  ) : (
    <p>Please choose valid method</p>
  );

  return (
    <div className="flex flex-col">
      {Content}
      <VerifyMethodFooter onClick={navigateFn} />
    </div>
  );
};

export default VerifyMethodContent;
