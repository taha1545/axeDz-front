"use client";

import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import api from "@/app/services/api";

type VerifyPhoneFormData = {
  code: string;
};

const VerifyPhonePage = () => {
  const [message, setMessage] = useState("");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<VerifyPhoneFormData>({
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: VerifyPhoneFormData) => {
    try {
      setMessage("");

      // 🔥 Replace with backend call
      // await api.post("/auth/verify-phone", { code: data.code });
      const phone = localStorage.getItem("pendingPhone");

      await api.post("/auth/send-verify-sms-otp", {
        phone,
        code: data.code,
      });

      setMessage("Phone verified successfully!");
    } catch (err) {
      setMessage("Invalid or expired code.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-screen py-2">
      {/* LOGO */}
      <div className="absolute top-4 left-4 flex flex-col items-start">
        <span className="text-2xl text-primary font-bold">AxeDz</span>
      </div>

      <h2 className="text-2xl font-bold">Verify Your Phone Number</h2>

      <p className="text-sm text-muted-foreground mb-6">
        Please enter the verification code sent to your phone number.
      </p>

      <form
        className="w-full max-w-sm flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* OTP FIELD */}
        <Controller
          name="code"
          control={control}
          rules={{
            required: "Code is required",
            minLength: {
              value: 4,
              message: "Code must be 4 digits",
            },
          }}
          render={({ field }) => (
            <InputOTP
              maxLength={4}
              pattern={REGEXP_ONLY_DIGITS}
              value={field.value}
              onChange={field.onChange}
            >
              <InputOTPGroup className="flex justify-center gap-15">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          )}
        />

        {/* MESSAGE */}
        {message && (
          <p className="text-sm text-center text-muted-foreground">{message}</p>
        )}

        {/* SUBMIT */}
        <Button
          type="submit"
          variant="outline"
          size="lg"
          className="rounded-4xl border-foreground"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Verifying..." : "Verify"}
        </Button>
      </form>
    </div>
  );
};

export default VerifyPhonePage;
