"use client"


import FloatingLabelInput from '@/components/shared/FloatingLabelInput'
import InputError from '@/components/shared/InputError';
import PrimaryButton from '@/components/shared/PrimaryButton';
import { apiUrl, routes } from '@/constants/api';
import { signupStep1Schema, SignupStep1Values } from '@/schemas/signup.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CheckSvg from "@/../public/icons/check-circle-fill-green.svg"
import CheckingLoader from '@/components/shared/Loader/CheckingLoader';
import SparklesSvg from "@/../public/icons/Sparkles.svg"
import Link from 'next/link';
import FloatingLabelSelect from '@/components/shared/FloatingLabelSelect';

type SignupStep1Error = {
  name?: string;
  username?: string;
  email?: string;
  gender?: string;
};

type SignupStep1Success = {
  username?: boolean;
  email?: boolean;
};

type SignupFormIdentiferProps = {
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
}

const SignupFormIdentifer = ({ setStep, setSignupData, signupData }: SignupFormIdentiferProps) => {
  const [signupStep1Error, setSignupStep1Error] =
    useState<SignupStep1Error | null>(null);
  const [signupStep1Success, setSignupStep1Success] =
    useState<SignupStep1Success>({});

  const [checking, setChecking] = useState<{
    username: boolean;
    email: boolean;
  }>({
    username: false,
    email: false
  })

  const [pending, setPending] = useState<{
    username: boolean;
    email: boolean;
  }>({
    username: false,
    email: false,
  });

  const [isSubmiting, setIsSubmiting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupStep1Values>({
    resolver: zodResolver(signupStep1Schema),
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      name: signupData.name,
      username: signupData.username,
      email: signupData.email,
      gender: signupData.gender,
    },
  });

  const name = watch("name");
  const username = watch("username");
  const email = watch("email");
  const gender = watch("gender");

  const generateUsername = async () => {
    const cleanName = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, "");

    if (!cleanName) return;

    setChecking((prev) => ({
      ...prev,
      username: true,
    }));

    try {
      for (let i = 0; i < 10; i++) {
        const randomNumber = Math.floor(100 + Math.random() * 900);
        const generatedUsername = `${cleanName}${randomNumber}`;

        const response = await fetch(
          apiUrl(
            `${routes.checkUsername}/?username=${encodeURIComponent(
              generatedUsername
            )}`
          )
        );

        const data = await response.json();

        if (data.available) {
          setValue("username", generatedUsername, {
            shouldValidate: true,
            shouldDirty: true,
          });

          setSignupStep1Error((prev) => ({
            ...prev,
            username: undefined,
          }));

          setSignupStep1Success((prev) => ({
            ...prev,
            username: true,
          }));

          return;
        }
      }
    } finally {
      setChecking((prev) => ({
        ...prev,
        username: false,
      }));
    }
  };

  const checkUsername = async (username: string) => {
    if (!username || errors.username) return;
    setChecking((prev) => ({ ...prev, username: true }))

    const response = await fetch(
      apiUrl(`${routes.checkUsername}/?username=${encodeURIComponent(username)}`)
    );

    const data = await response.json();

    setPending((prev) => ({
      ...prev,
      username: !data.available && !!data.pending,
    }));

    setSignupStep1Error((prev) => ({
      ...prev,
      username: data.available
        ? undefined
        : data.pending
          ? "Username is temporarily unavailable"
          : `Username ${username} is not available`,
    }));

    setSignupStep1Success((prev) => ({
      ...prev,
      username: data.available,
    }));

    setChecking((prev) => ({ ...prev, username: false }))

    return data.available;
  };

  const checkEmail = async (email: string) => {
    if (!email || errors.email) return;

    setChecking((prev) => ({ ...prev, email: true }))

    const response = await fetch(
      apiUrl(`${routes.checkEmail}/?email=${encodeURIComponent(email)}`)
    );

    const data = await response.json();

    setPending((prev) => ({
      ...prev,
      email: !data.available && !!data.pending,
    }));

    setSignupStep1Error((prev) => ({
      ...prev,
      email: data.available
        ? undefined
        : data.pending
          ? "This email is already awaiting verification. Please check your inbox or use a different email."
          : "The email you have provided is already associated with an account.",
    }));

    setSignupStep1Success((prev) => ({
      ...prev,
      email: data.available,
    }));

    setChecking((prev) => ({ ...prev, email: false }))
    return data.available;
  };

  useEffect(() => {
    setSignupStep1Error((prev) => ({
      ...prev,
      username: undefined,
    }));

    setSignupStep1Success((prev) => ({
      ...prev,
      username: false,
    }));

    setPending((prev) => ({
      ...prev,
      username: false,
    }));

    if (!username || errors.username) return;

    const timer = setTimeout(() => {
      checkUsername(username);
    }, 500);

    return () => clearTimeout(timer);
  }, [username, errors.username]);

  useEffect(() => {
    setSignupStep1Error((prev) => ({
      ...prev,
      email: undefined,
    }));

    setSignupStep1Success((prev) => ({
      ...prev,
      email: false,
    }));

    setPending((prev) => ({
      ...prev,
      email: false,
    }));

    if (!email || errors.email) return;

    const timer = setTimeout(() => {
      checkEmail(email);
    }, 500);

    return () => clearTimeout(timer);
  }, [email, errors.email]);

  const onSubmit = (data: SignupStep1Values) => {
    const error = !signupStep1Success.email || !signupStep1Success.username;

    if (error) return;

    setIsSubmiting(true)

    setSignupData(data)
    setTimeout(() => {
      setIsSubmiting(false)
      setStep(2)
    }, 1000)
  }

  const FieldError = ({
    name,
  }: {
    name: "name" | "username" | "email" | "gender";
  }) => {
    const error = errors[name]?.message || signupStep1Error?.[name];

    return (
      <div>
        {error ? <InputError text={error} /> : null}
        {name === "email" &&
          signupStep1Error?.[name] &&
          !pending.email ? (
          <span className="text-danger hidden xs:inline text-sm lg:text-mid">
            <Link
              href="/login"
              className="text-link hover:text-link-hover"
            >
              Sign in
            </Link>{" "}
            or{" "}
            <Link
              href="/reset-password"
              className="text-link hover:text-link-hover"
            >
              reset your password
            </Link>
            .
          </span>
        ) : null}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2"
    >
      {/* Name */}
      <div className="mb-2 flex flex-col gap-1">
        <FloatingLabelInput
          name="name"
          text="Name"
          register={register}
          error={!!errors.name}
          watch={watch}
          success={!!name && !errors.name}
          className="!h-[54px]"
        />

        <FieldError name="name" />
      </div>

      {/* Username */}
      <div className="mb-2 flex flex-col gap-1">
        <FloatingLabelInput
          name="username"
          text="Username"
          register={register}
          error={!!errors.username || !!signupStep1Error?.username}
          watch={watch}
          success={signupStep1Success.username === true}
          endIcon={
            !username && name ? (
              <span onClick={generateUsername}>
                <SparklesSvg />
              </span>
            ) : checking.username ? (
              <CheckingLoader />
            ) : signupStep1Success.username === true ? (
              <CheckSvg />
            ) : null
          }
          className="!h-[54px]"
        />

        <FieldError name="username" />
      </div>

      {/* Email */}
      <div className="mb-2 flex flex-col gap-1">
        <FloatingLabelInput
          name="email"
          text="Email"
          register={register}
          error={!!errors.email || !!signupStep1Error?.email}
          watch={watch}
          success={signupStep1Success.email === true}
          endIcon={
            checking.email ? (
              <CheckingLoader />
            ) : signupStep1Success.email === true ? (
              <CheckSvg />
            ) : null
          }
          className="!h-[54px]"
        />

        <FieldError name="email" />
      </div>

      {/* Gender */}
      <div className="mb-2 flex flex-col gap-1">
        <FloatingLabelSelect
          name="gender"
          text="Gender"
          register={register}
          watch={watch}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "non-binary", label: "Non-binary" },
            { value: "prefer-not-to-say", label: "Prefer not to say" },
          ]}
          error={!!errors.gender}
          success={!!gender && !errors.gender}
          className="!h-[54px]"
        />

        <FieldError name="gender" />
      </div>

      <PrimaryButton
        className="mt-2 w-full bg-[#166D4C]"
        btnType="submit"
        text="Continue"
        disbaled={isSubmiting}
      />
    </form>
  );
};

export default SignupFormIdentifer;