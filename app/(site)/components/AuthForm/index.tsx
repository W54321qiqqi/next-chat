"use client";
import { useState, useCallback, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import AuthSocialButton from "../AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { request } from "@/app/utils";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import type { FieldValues, SubmitHandler } from "react-hook-form";
type Variant = "LOGIN" | "REGISTER";
import Form from "./Form";
export default function AuthForm() {
  const router = useRouter();
  const session = useSession();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);
  const {
    control: control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    // Axios Register
    if (variant === "REGISTER") {
      try {
        // TODO: data['password'] md5加密
        const res = await request.post("/register", data);
        // 注册成功直接添加session push user
        await signIn("credentials", {
          ...data,
          redirect: false,
        });
        toast.success(res.msg);
      } catch (error) {
        toast.error("Something went wrong !");
      } finally {
        setIsLoading(false);
      }
    }
    if (variant === "LOGIN") {
      // NextAuth Sigin
      signIn("credentials", {
        ...data,
        redirect: false,
      }).then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials");
        }
        if (callback?.ok && !callback.error) {
          toast.success("Logged in !");
        }
      });
    }
  };
  const socialAction = (action: "github" | "google") => {
    // NextAuth Social Sign in
    setIsLoading(true);
    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials");
        }
        if (callback?.ok && !callback.error) {
          toast.success("Logged in !");
        }
      })
      .finally(() => setIsLoading(false));
  };
  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
    reset();
  }, [reset, variant]);
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <Form
          onSubmit={onSubmit}
          disabled={isLoading}
          variant={variant}
          control={control}
          handleSubmit={handleSubmit}
          errors={errors}
        ></Form>
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
}
