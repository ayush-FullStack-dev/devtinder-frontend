"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineEmail } from "react-icons/md";

import { loginIdentifySchema, loginIdentfy } from "@/schemas/login.schema";
import IconTextInput from "@/components/shared/IconTextInput";
import PrimaryButton from "@/components/shared/PrimaryButton";
import jakarta from "@/assets/fonts/font.jakarta";
import InputError from "@/components/shared/InputError";
import { getDeviceId, getDeviceSize } from "@/lib/getDeviceInfo";
import { useState } from "react";
import {
  loginIdentifySuccessResponse,
  loginIdentifyErrorResponse,
} from "@/types/auth/login/loginIdenfity.type";
import { useLoginStore } from "@/store/login.store";
import { apiUrl, routes } from "@/constants/api";

export const LoginFormIdentfy = () => {
  const setStep = useLoginStore((state) => state.setStep);
  const setLoginIdentifyValue = useLoginStore(
    (state) => state.setLoginIdentifyInfo,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginIdentifyInfo, setLoginIdentifyInfo] =
    useState<loginIdentifySuccessResponse | null>(null);
  const [loginIdentifyError, setLoginIdentifyError] =
    useState<loginIdentifyErrorResponse | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: zodResolver(loginIdentifySchema),
    defaultValues: {
      identifier: "",
    },
  });

  const onSubmit = async (data: loginIdentfy) => {
    setIsSubmitting(true);

    try {
      const identifier = data.identifier;
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
      const identiferFiled = isEmail ? "email" : "username";

      const response = await fetch(apiUrl(routes.loginIdentify), {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [identiferFiled]: identifier,
          deviceId: getDeviceId(localStorage),
          deviceSize: getDeviceSize(localStorage, true),
          clientTimestamp: new Date(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setLoginIdentifyInfo(result);
        setLoginIdentifyValue(result);
        setLoginIdentifyError(null);
        setStep(2);
      } else {
        setLoginIdentifyError(result);
        setLoginIdentifyValue(null);
        setLoginIdentifyInfo(null);
      }
    } catch (err) {
      setLoginIdentifyError({
        success: false,
        message: "Intervel server Error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="box-border inline-flex  flex-col gap-3 -ml-2"
    >
      <span>
        <label htmlFor="identifier" className={`w-full font-bold ${jakarta.className}`}>
          Email or Username
        </label>
      </span>


      <IconTextInput
        name="identifier"
        text="Enter Username or Email"
        icon={MdOutlineEmail}
        register={register}
        error={!!errors.identifier || !!loginIdentifyError}
        success={isSubmitted && !!loginIdentifyInfo}
        className="w-full overflow-clip"
      />

      <div className="h-5">
        {errors.identifier ? (
          <InputError text={errors.identifier.message} />
        ) : loginIdentifyError ? (
          <InputError text={loginIdentifyError.message} />
        ) : null}
      </div>

      <PrimaryButton
        className={`mt-3  w-full`}
        btnType="submit"
        text="Continue"
        disbaled={isSubmitting}
      />
    </form>
  );
};

export default LoginFormIdentfy;
