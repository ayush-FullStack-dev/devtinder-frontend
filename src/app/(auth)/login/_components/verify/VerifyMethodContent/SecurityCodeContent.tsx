import { googleSans } from "@/assets/fonts/font.google";
import Header from "@/components/shared/Header";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { useLoginStore } from "@/store/login.store";
import { loginVerifyErrorResponse } from "@/types/auth/login/loginVerify.type";
import { useState } from "react";
import { verifyLogin } from "@/services/login/verifyLogin";
import CodeInputGroup from "@/components/shared/CodeInputGroup";

type SecurityCodeContentProps = {
  onResponseResolve?: (
    isSuccess: boolean,
    setIsFetching: (state: boolean) => void,
  ) => void;
};

const SecurityCodeContent = ({
  onResponseResolve = () => undefined,
}: SecurityCodeContentProps) => {
  // store states
  const hasHydrated = useLoginStore((state) => state._hasHydrated);
  if (!hasHydrated) return null;
  const loginIdentify = useLoginStore((state) => state.loginIdentifyInfo);

  //temp states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [securityCode, setSecurityCode] = useState("");
  const [verifyLoginError, setVerifyLoginError] = useState<
    loginVerifyErrorResponse | null | undefined
  >(undefined);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (securityCode.length !== 10) {
      setVerifyLoginError({
        success: false,
        message: "Securty code max 10 cahracter long min 10 charcater",
      });
      return;
    }

    setVerifyLoginError(null);
    setIsSubmitting(true);

    const { isSuccess, error } = await verifyLogin({
      loginIdentify,
      method: "security_code",
      code: securityCode,
    });

    if (error) {
      setVerifyLoginError(error as loginVerifyErrorResponse);
    }

    onResponseResolve(isSuccess, setIsSubmitting);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="box-border inline-flex  flex-col pl-3 pr-3 gap-2 -ml-2"
    >
      <Header
        title="Verify With Security Code"
        description="Enter the 10-character securty code generated from your DevTinder account."
        className="mb-3"
      />

      <div>
        <label htmlFor="code" className={`font-bold ${googleSans.className}`}>
          Security Code
        </label>

        <CodeInputGroup
          length={10}
          onChange={setSecurityCode}
          separatorAfter={5}
          className="mt-5"
          error={verifyLoginError}
          success={verifyLoginError === undefined ? false : !verifyLoginError}
        />
      </div>

      <PrimaryButton
        className={`mt-8 w-140`}
        btnType="submit"
        text="Continue"
        disbaleText="Signing in..."
        disbaled={isSubmitting}
      />
    </form>
  );
};

export default SecurityCodeContent;
