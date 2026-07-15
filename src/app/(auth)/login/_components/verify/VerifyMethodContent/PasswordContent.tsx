import { googleSans, googleSansFlex } from "@/assets/fonts/font.google";
import Header from "@/components/shared/Header";
import InputError from "@/components/shared/InputError";
import PrimaryButton from "@/components/shared/PrimaryButton";
import {
  verifyPasswordClient,
  verifyPasswordClientSchema,
} from "@/schemas/login.schema";
import { useLoginStore } from "@/store/login.store";
import { loginVerifyErrorResponse } from "@/types/auth/login/loginVerify.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import PasswordInput from "./_components/PasswordInput";
import CheckboxWithDescription from "@/components/shared/CheckboxWithDescription";
import { verifyLogin } from "@/services/login/verifyLogin";

type PasswordContentProps = {
  onResponseResolve?: (
    isSuccess: boolean,
    setIsFetching: (state: boolean) => void,
  ) => void;
};

const PasswordContent = ({
  onResponseResolve = () => undefined,
}: PasswordContentProps) => {
  // store states
  const hasHydrated = useLoginStore((state) => state._hasHydrated);
  if (!hasHydrated) return null;
  const loginIdentify = useLoginStore((state) => state.loginIdentifyInfo);

  //temp states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verifyLoginError, setVerifyLoginError] =
    useState<loginVerifyErrorResponse | null>();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: zodResolver(verifyPasswordClientSchema),
    defaultValues: {
      code: "",
      remember: true,
    },
  });

  const onSubmit = async (data: verifyPasswordClient) => {
    setIsSubmitting(true);

    try {
      const { isSuccess, error } = await verifyLogin({
        loginIdentify,
        method: "password",
        code: data.code,
        remember: data.remember,
      });

      if (error) {
        setVerifyLoginError(error as loginVerifyErrorResponse);
      }

      onResponseResolve(isSuccess, setIsSubmitting);
    } catch (e) {
      setVerifyLoginError(e as loginVerifyErrorResponse);
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="box-border inline-flex  flex-col pl-3 pr-3 gap-2 -ml-2"
    >
      <Header
        title="Verify With Password"
        description="Enter your account password to securely sign in to your account."
        className="mb-1"
      />
      <div>
        <label htmlFor="code" className={`font-bold ${googleSans.className}`}>
          Password
        </label>

        <PasswordInput
          name="code"
          text="Enter your password"
          register={register}
          error={!!errors.code || !!verifyLoginError}
          success={isSubmitted && !!verifyLoginError?.message}
          className="w-140 mt-2 h-13"
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </div>
      <div className="h-6">
        {errors.code ? (
          <InputError text={errors.code.message} />
        ) : verifyLoginError ? (
          <InputError text={verifyLoginError?.message} />
        ) : null}
      </div>
      <Controller
        control={control}
        name="remember"
        render={({ field }) => (
          <CheckboxWithDescription
            title="Keep me signed in"
            description="You'll stay signed in on this device for up to 30 days."
            checked={field.value}
            className="mt-1"
            onCheckedChange={field.onChange}
          />
        )}
      />
      <div className="mt-1">
        <Link
          className={`${googleSansFlex.className} text-sm text-[#9569e7] tracking-tight font-extralight`}
          href="/forget-password"
        >
          Forgot password?
        </Link>
      </div>
      <PrimaryButton
        className={`mt-2 w-140`}
        btnType="submit"
        text="Continue"
        disbaleText="Signing in..."
        disbaled={isSubmitting}
      />
    </form>
  );
};

export default PasswordContent;
