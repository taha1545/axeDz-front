import { z } from 'zod';

export const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z
        .string()
        .optional()
        .refine((val) => !val || /^[0-9\s]{9,}$/.test(val), {
            message: 'Invalid phone number',
        }),
    subject: z.string().min(3, 'Subject must be at least 3 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long'),
});

export type ContactInput = z.infer<typeof contactSchema>;