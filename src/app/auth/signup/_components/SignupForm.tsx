"use client";

import FloatingLabelInput from "@/components/shared/FloatingLabelInput";
import InputError from "@/components/shared/InputError";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { apiUrl, routes } from "@/constants/api";
import { SignupFormValues, signupSchema } from "@/schemas/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import EmailVerificationModal from "@/app/auth/verify/_components/EmailVerificationModal";

type SignupFormProps = {
  setStep: (step: 1 | 2) => void;
  signupData: {
    name: string;
    username: string;
    email: string;
    gender: "male" | "female" | "non-binary" | "prefer-not-to-say" | undefined;
    password?: string;
    confirmPassword?: string;
  };
  setSignupData: React.Dispatch<React.SetStateAction<any>>;
};

const SignupForm = ({
  signupData,
  setSignupData,
}: SignupFormProps) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("m7987172@gmail.com");

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      name: signupData.name,
      username: signupData.username,
      email: signupData.email,
      gender: signupData.gender,
      password: signupData.password ?? "",
      confirmPassword: signupData.confirmPassword ?? "",
    },
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const FieldError = ({
    name,
  }: {
    name: "password" | "confirmPassword";
  }) => {
    const error = errors[name]?.message;

    return (
      <div>
        {error ? <InputError text={error} /> : null}
      </div>
    );
  };

  useEffect(() => {
    if (confirmPassword) {
      trigger("confirmPassword");
    }
  }, [password, confirmPassword, trigger]);

  const onSubmit = async (data: SignupFormValues) => {
    setIsSubmiting(true);

    try {
      const response = await fetch(apiUrl(routes.signup), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return;
      }

      setVerificationEmail(data.email);
      setSignupData({
        name: "",
        username: "",
        email: "",
        gender: undefined,
        password: "",
        confirmPassword: "",
      });

      setVerificationSent(true);

    } catch (error) {
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
    >
      <EmailVerificationModal show={verificationSent} sentMail={verificationEmail}/>
      
      <div className="flex flex-col gap-2">
        <FloatingLabelInput
          name="password"
          text="Password"
          type={showPassword ? "text" : "password"}
          register={register}
          error={!!errors.password}
          success={!!password && !errors.password}
          watch={watch}
          endIcon={
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="cursor-pointer"
            >
              {showPassword ? (
                <Eye size={19} />
              ) : (
                <EyeOff size={19} />
              )}
            </span>
          }
        />

        <FieldError name="password" />
      </div>

      <div className="flex flex-col gap-2">
        <FloatingLabelInput
          name="confirmPassword"
          text="Confirm Password"
          type="password"
          register={register}
          watch={watch}
          error={!!errors.confirmPassword}
          success={!!confirmPassword && !errors.confirmPassword}
        />

        <FieldError name="confirmPassword" />
      </div>

      <PrimaryButton
        className="mt-3 w-full"
        btnType="submit"
        text="Create account"
        disbaleText="Creating account..."
        disbaled={isSubmiting}
      />
    </form>
  );
};

export default SignupForm;