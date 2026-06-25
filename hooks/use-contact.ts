import { useMutation } from '@tanstack/react-query';
import { sendContactMessage } from '@/services';

export function useContact() {
    return useMutation({
        mutationFn: sendContactMessage,
    });
}
