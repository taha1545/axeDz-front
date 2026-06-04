"use client";

import { useState } from "react";
import { ContactService, ContactPayload } from "@/app/(en)/(main)/services/contact.service";

export function useContact() {
    //
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    //
    const sendMessage = async (data: ContactPayload) => {
        try {
            //
            setLoading(true);
            setError(null);
            setSuccess(false);
            //
            await ContactService.sendMessage(data);
            //
            setSuccess(true);
            //
        } catch (err: any) {
            setError(err?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return {
        sendMessage,
        loading,
        error,
        success,
    };
}