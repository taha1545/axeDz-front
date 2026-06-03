import api from "@/lib/axios";

export interface ContactPayload {
    name: string;
    phone?: string;
    email: string;
    subject: string;
    message: string;
}

export const ContactService = {
    sendMessage(data: ContactPayload) {
        return api.post("/contacts", data);
    },
};