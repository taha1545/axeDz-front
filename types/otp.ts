export interface VerifySmsPayload {
    email: string;
    otp_code: string;
}

export interface ResendOtpPayload {
    email: string;
}

export interface SendResetOtpPayload {
    email: string;
}

export interface ResetPasswordPayload {
    email: string;
    otp_code: string;
    password: string;
}
