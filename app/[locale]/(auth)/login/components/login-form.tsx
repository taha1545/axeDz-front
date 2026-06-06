"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { EyeOff, Eye } from "lucide-react";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full lg:w-1/2 flex flex-col gap-4 px-6 sm:px-10 lg:px-20 py-10 border-r-foreground border-b-2 lg:border-b-0 lg:border-r-2 border-border bg-background"
    >
      <h1 className="text-2xl w-fit font-bold text-background bg-foreground py-1 px-2">
        Login
      </h1>

      {/* EMAIL */}
      <div className="flex flex-col gap-2">
        <Label className="text-muted-foreground">Email</Label>

        <Input
          type="email"
          placeholder="Enter your email"
          className="h-11 rounded-4xl px-4"
          {...register("email", {
            required: "Email is required",
          })}
        />

        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* PASSWORD */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Label className="text-muted-foreground">Password</Label>

          <div
            className="flex items-center gap-1 cursor-pointer select-none"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <Eye size={18} className="text-muted-foreground" />
            ) : (
              <EyeOff size={18} className="text-muted-foreground" />
            )}

            <span className="text-sm text-muted-foreground">
              {showPassword ? "show" : "hide"}
            </span>
          </div>
        </div>

        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className="h-11 rounded-4xl px-4"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />

        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* RESET */}
      <Link href="#" className="text-sm underline w-fit">
        Reset Password
      </Link>

      {/* SUBMIT */}
      <Button
        type="submit"
        size="lg"
        className="rounded-4xl"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>

      {/* OR */}
      <div className="flex items-center gap-4 my-2 text-muted-foreground text-sm">
        <div className="flex-1 border-t border-border"></div>
        OR
        <div className="flex-1 border-t border-border"></div>
      </div>

      {/* SOCIAL */}
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="rounded-4xl"
        onClick={() =>
          (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/me`)
        }
      >
        <FcGoogle size={20} />
        Continue with Google
      </Button>

      <Button
        type="button"
        size="lg"
        className="rounded-4xl bg-foreground text-muted hover:bg-foreground/90"
        onClick={() =>
          (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/github`)
        }
      >
        <FaGithub size={20} />
        Continue with GitHub
      </Button>

      {/* FOOTER */}
      <p className="text-xs text-muted-foreground mt-2">
        By continuing, you agree to the{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/terms" className="underline">
          Terms of Service
        </Link>
        .
      </p>
    </form>
  );
}
