"use client";

import { Button, Input } from "@/app/components";
import AuthSocialButton from "./AuthSocialButton";
import { useState, useCallback } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
type Variant = "LOGIN" | "REGISTER";
const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      // Axios Register
    }
    if (variant === "LOGIN") {
      // NextAuth Sigin
    }
  };
  const socialAction = (action: "github" | "google") => {
    setIsLoading(true);
    // NextAuth Social Sign in
  };
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              erros={errors}
              register={register}
              disabled={isLoading}
            ></Input>
          )}
          <Input
            id="email"
            label="Email address"
            type="email"
            register={register}
            erros={errors}
            disabled={isLoading}
          ></Input>
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            erros={errors}
            disabled={isLoading}
          ></Input>
          <Button fullWidth type="submit" disabled={isLoading}>
            {variant === "LOGIN" ? "Sign in" : "Register"}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            ></AuthSocialButton>
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            ></AuthSocialButton>
          </div>

          <div
            className="
          flex
          gap-2
          justify-center
          text-sm
          mt-6
          px-2
          text-gray-500
          "
          >
            <div>
              {variant === "LOGIN"
                ? "New to Messenger"
                : " Already have a account ?"}
            </div>
            <div
              onClick={toggleVariant}
              className="underline cursor-pointer hover:text-sky-500"
            >
              {variant === "LOGIN" ? "Create an account" : "Login in"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthForm;
