"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import React, { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import api from "@/app/services/api";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

type SignupFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const { login } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>();

  const password = watch("password");

  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true);
      setError("");

      // 1. Signup
      const res = await api.post("/auth/signup", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
      await login(data.email, data.password);
      // 2. Only send OTP if signup succeeded
      if (res.data?.success) {
        localStorage.setItem("pendingPhone", data.phone);
        router.push("/verify-phone");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "An error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <FieldGroup>
        <h1 className="text-2xl w-fit font-bold text-background bg-foreground py-1 px-2">
          Sign up
        </h1>

        {/* NAME */}
        <Field>
          <FieldLabel>Full Name</FieldLabel>
          <Input
            placeholder="John Doe"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Min 3 characters" },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </Field>

        {/* EMAIL */}
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input
            type="email"
            placeholder="m@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </Field>

        {/* PHONE */}
        <Field>
          <FieldLabel>Phone Number</FieldLabel>
          <Input
            type="tel"
            placeholder="+213 123 456 789"
            {...register("phone", {
              required: "Phone is required",
            })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </Field>

        {/* PASSWORD */}
        <Field>
          <FieldLabel>Password</FieldLabel>
          <Input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 characters" },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </Field>

        {/* CONFIRM PASSWORD */}
        <Field>
          <FieldLabel>Confirm Password</FieldLabel>
          <Input
            type="password"
            {...register("confirmPassword", {
              required: "Confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </Field>

        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

        {/* SUBMIT */}
        <Field>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </Button>
        </Field>

        {/* SOCIAL */}
        <div className="flex items-center gap-4 my-2 text-muted-foreground text-sm">
          <div className="flex-1 border-t border-border"></div>
          OR
          <div className="flex-1 border-t border-border"></div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="rounded-4xl"
        >
          <FcGoogle size={20} />
          Continue with Google
        </Button>

        <Button
          type="button"
          size="lg"
          className="rounded-4xl bg-foreground text-muted hover:bg-foreground/90"
        >
          <FaGithub size={20} />
          Continue with GitHub
        </Button>
      </FieldGroup>
    </form>
  );
}
