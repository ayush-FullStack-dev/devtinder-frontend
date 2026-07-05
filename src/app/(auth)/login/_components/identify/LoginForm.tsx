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
import { loginIdentifyRoute } from "@/constants/api";

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
    const start = Date.now();

    try {
      const identifier = data.identifier;
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
      let identiferFiled = null;

      if (!isEmail) {
        identiferFiled = "username";
      } else {
        identiferFiled = "email";
      }

      const response = await fetch(loginIdentifyRoute, {
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
        setIsSubmitting(false);
        setLoginIdentifyInfo(result);
        setLoginIdentifyValue(result);
        setLoginIdentifyError(null);
        setStep(2);
      } else {
        setLoginIdentifyError(result);
        setLoginIdentifyValue(null);
        setLoginIdentifyInfo(null);
      }

      setTimeout(() => setIsSubmitting(false), 500);
    } catch (err) {
      setIsSubmitting(false);
      setLoginIdentifyError({
        success: false,
        message: "Intervel server Error",
      });
    } finally {
      const MIN_LOADING_TIME = 500;
      const elapsed = Date.now() - start;
      const remaining = Math.max(MIN_LOADING_TIME - elapsed, 0);

      setTimeout(() => {
        setIsSubmitting(false);
      }, remaining);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="box-border inline-flex  flex-col p-3  gap-3 -ml-2"
    >
      <label htmlFor="email" className={`font-bold ${jakarta.className}`}>
        Email or Username
      </label>

      <IconTextInput
        name="identifier"
        text="Enter Username or Email"
        icon={MdOutlineEmail}
        register={register}
        error={!!errors.identifier || !!loginIdentifyError}
        success={isSubmitted && !!loginIdentifyInfo}
      />
      <div className="h-6">
        {errors.identifier ? (
          <InputError text={errors.identifier.message} />
        ) : loginIdentifyError ? (
          <InputError text={loginIdentifyError.message} />
        ) : null}
      </div>

      <PrimaryButton
        className={`mt-2 mb-2`}
        btnType="submit"
        text="Continue"
        disbaled={isSubmitting}
      />
    </form>
  );
};

export default LoginFormIdentfy;
