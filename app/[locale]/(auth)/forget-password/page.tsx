"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import api from "@/app/services/api";

type ForgetPasswordFormData = {
  email: string;
};

const ForgetPasswordPage = () => {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordFormData>();

  const onSubmit = async (data: ForgetPasswordFormData) => {
    try {
      setMessage("");

      // 🔥 Replace with your backend call
      await api.post("/auth/send-reset-otp", {
        email: data.email,
      });
      // await api.post("/users/forgot-password", data);
      // await api.post("/auth/forgot-password", data);

      setMessage("Reset link sent to your email.");
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-screen py-2">
      {/* LOGO */}
      <div className="absolute top-4 left-4 flex flex-col items-start">
        <span className="text-2xl text-primary font-bold">AxeDz</span>
      </div>

      <h2 className="text-2xl font-bold">Forget Password</h2>

      <Link href="/login" className="text-sm text-primary hover:underline mb-6">
        Remember your password? Login here.
      </Link>

      <form
        className="w-full max-w-sm flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* EMAIL */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            className="bg-background"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />

          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </Field>

        {/* MESSAGE */}
        {message && <p className="text-sm text-green-600">{message}</p>}

        {/* SUBMIT */}
        <div className="flex items-center justify-between">
          <Button
            type="submit"
            variant="outline"
            size="lg"
            className="rounded-4xl border-foreground"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgetPasswordPage;
