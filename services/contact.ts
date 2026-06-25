import api from './api';
import type { ContactPayload } from '@/types';

export async function sendContactMessage(data: ContactPayload): Promise<void> {
    await api.post('/contacts', data);
}
