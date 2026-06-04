"use client";

import { Button } from "@/components/ui/button";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const VerifyPhonePage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-screen py-2">
      <div className="absolute top-4 left-4 flex flex-col items-start">
        <span className="text-2xl text-primary font-bold">AxeDz</span>
      </div>
      <h2 className="text-2xl font-bold ">Verify Your Phone Number</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Please enter the verification code sent to your phone number.
      </p>
      <form className="w-full max-w-sm flex flex-col gap-6">
        <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
          <InputOTPGroup className="flex justify-center gap-15 ">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>

        <Button
          type="submit"
          variant="outline"
          size="lg"
          className="rounded-4xl border-foreground "
        >
          Verify
        </Button>
      </form>
    </div>
  );
};

export default VerifyPhonePage;
