import api from './api';
import type {
    ResendOtpPayload, ResetPasswordPayload,
    SendResetOtpPayload, VerifySmsPayload
} from '@/types';



export async function verifySms(data: VerifySmsPayload): Promise<void> {
    await api.put('/auth/verify-sms', data);
}

export async function resendVerifyOtp(data: ResendOtpPayload): Promise<void> {
    await api.post('/auth/send-verify-sms-otp', data);
}

export async function sendResetOtp(data: SendResetOtpPayload): Promise<void> {
    await api.post('/auth/send-reset-otp', data);
}

export async function resetPassword(data: ResetPasswordPayload): Promise<void> {
    await api.put('/auth/reset-password-otp', data);
}
