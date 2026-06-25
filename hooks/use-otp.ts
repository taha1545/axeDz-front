import { useMutation } from '@tanstack/react-query';
import {
    verifySms,
    resendVerifyOtp,
    sendResetOtp,
    resetPassword
} from '@/services';


export function useVerifySms() {
    return useMutation({
        mutationFn: verifySms,
    });
}


export function useResendVerifyOtp() {
    return useMutation({
        mutationFn: resendVerifyOtp,
    });
}


export function useSendResetOtp() {
    return useMutation({
        mutationFn: sendResetOtp,
    });
}


export function useResetPassword() {
    return useMutation({
        mutationFn: resetPassword,
    });
}
