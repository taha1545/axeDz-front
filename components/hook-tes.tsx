'use client';

import { useState } from 'react';
import {
    useApiKeys,
    useCreateApiKey,
    useDeleteApiKey,
    useRotateApiKey,
    useUpdateApiKey,
} from '@/hooks/use-key';
import { useAuth } from '@/hooks/use-auth';
import { useContact } from '@/hooks/use-contact';
import {
    useResendVerifyOtp,
    useResetPassword,
    useSendResetOtp,
    useVerifySms,
} from '@/hooks/use-otp';
import { NormalButton, PrimaryButton } from '@/components/custom-button';
import { customToast } from '@/components/custom-toast';
import type { ApiKey } from '@/types';

type LogEntry = {
    id: number;
    label: string;
    status: 'success' | 'error';
    detail: string;
};

function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return 'Request failed';
}

function getFullErrorDetail(error: unknown) {
    if (typeof error !== 'object' || error === null) {
        return String(error);
    }

    const maybeAxiosError = error as {
        message?: string;
        name?: string;
        code?: string;
        response?: {
            status?: number;
            statusText?: string;
            data?: unknown;
            headers?: unknown;
        };
        request?: unknown;
        config?: {
            method?: string;
            url?: string;
            baseURL?: string;
            params?: unknown;
            data?: unknown;
        };
    };

    return JSON.stringify(
        {
            name: maybeAxiosError.name,
            message: maybeAxiosError.message,
            code: maybeAxiosError.code,
            response: maybeAxiosError.response
                ? {
                    status: maybeAxiosError.response.status,
                    statusText: maybeAxiosError.response.statusText,
                    data: maybeAxiosError.response.data,
                    headers: maybeAxiosError.response.headers,
                }
                : undefined,
            request: maybeAxiosError.request ? 'Request was sent but no response was received' : undefined,
            config: maybeAxiosError.config
                ? {
                    method: maybeAxiosError.config.method,
                    url: maybeAxiosError.config.url,
                    baseURL: maybeAxiosError.config.baseURL,
                    params: maybeAxiosError.config.params,
                    data: maybeAxiosError.config.data,
                }
                : undefined,
        },
        null,
        2
    );
}

function Field({
    label,
    value,
    onChange,
    type = 'text',
    placeholder,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    placeholder?: string;
}) {
    return (
        <label className="grid gap-1.5 text-sm font-medium text-foreground">
            {label}
            <input
                value={value}
                onChange={(event) => onChange(event.target.value)}
                type={type}
                placeholder={placeholder}
                className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
        </label>
    );
}

export function HookTestPanel() {
    const [generatedUser] = useState(() => {
        const suffix = Date.now().toString().slice(-6);
        return {
            name: `Hook Tester ${suffix}`,
            email: `hook.tester.${suffix}@axedz.test`,
            phone: `0555${suffix}`,
            password: 'Password123',
        };
    });

    const auth = useAuth();
    const apiKeys = useApiKeys();
    const createApiKey = useCreateApiKey();
    const updateApiKey = useUpdateApiKey();
    const rotateApiKey = useRotateApiKey();
    const deleteApiKey = useDeleteApiKey();
    const contact = useContact();
    const verifySms = useVerifySms();
    const resendVerifyOtp = useResendVerifyOtp();
    const sendResetOtp = useSendResetOtp();
    const resetPassword = useResetPassword();

    const [signupForm, setSignupForm] = useState(generatedUser);
    const [loginForm, setLoginForm] = useState({
        identifier: generatedUser.email,
        password: generatedUser.password,
    });
    const [projectName, setProjectName] = useState('Hook Test Project');
    const [otpEmail, setOtpEmail] = useState(generatedUser.email);
    const [otpCode, setOtpCode] = useState('123456');
    const [resetPasswordValue, setResetPasswordValue] = useState('Password1234');
    const [logs, setLogs] = useState<LogEntry[]>([]);

    const firstKey = apiKeys.data?.[0] as ApiKey | undefined;

    const addLog = (label: string, status: LogEntry['status'], detail: string) => {
        setLogs((current) => [
            { id: Date.now(), label, status, detail },
            ...current.slice(0, 7),
        ]);
    };

    const runAction = async (label: string, action: () => Promise<unknown>) => {
        try {
            const result = await action();
            addLog(label, 'success', JSON.stringify(result ?? 'OK', null, 2));
            customToast.success({ title: `${label} success` });
        } catch (error) {
            const message = getErrorMessage(error);
            addLog(label, 'error', getFullErrorDetail(error));
            customToast.error({ title: `${label} failed`, description: message });
        }
    };

    return (
        <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
            <div className="mx-auto grid w-full max-w-6xl gap-6">
                <header className="grid gap-2">
                    <p className="text-sm font-semibold text-primary">Hook test panel</p>
                    <h1 className="text-2xl font-semibold tracking-normal sm:text-3xl">
                        Auth, API key, contact, and OTP hooks
                    </h1>
                    <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                        Use this temporary page to call the project hooks against your API. Payment and communication hooks are not included.
                    </p>
                </header>

                <section className="grid gap-4 rounded-xl border border-border bg-card/60 p-4 sm:p-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">Current user</h2>
                            <p className="text-sm text-muted-foreground">
                                {auth.user ? `${auth.user.name} - ${auth.user.email}` : 'No authenticated user'}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <NormalButton
                                text="Refresh user"
                                styleType="soft"
                                onClick={() => void runAction('Refresh user', async () => auth.refresh())}
                            />
                            <NormalButton
                                text="Logout"
                                styleType="soft"
                                disabled={!auth.isAuthenticated || auth.isLoggingOut}
                                onClick={() => void runAction('Logout', auth.logout)}
                            />
                        </div>
                    </div>
                </section>

                <div className="grid gap-6 lg:grid-cols-2">
                    <section className="grid gap-4 rounded-xl border border-border bg-card/60 p-4 sm:p-5">
                        <h2 className="text-lg font-semibold">Signup new user</h2>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Field label="Name" value={signupForm.name} onChange={(name) => setSignupForm((form) => ({ ...form, name }))} />
                            <Field label="Phone" value={signupForm.phone} onChange={(phone) => setSignupForm((form) => ({ ...form, phone }))} />
                            <Field label="Email" value={signupForm.email} onChange={(email) => setSignupForm((form) => ({ ...form, email }))} />
                            <Field label="Password" type="password" value={signupForm.password} onChange={(password) => setSignupForm((form) => ({ ...form, password }))} />
                        </div>
                        <PrimaryButton
                            text="Signup"
                            disabled={auth.isSigningUp}
                            onClick={() => void runAction('Signup', () => auth.signup(signupForm))}
                        />
                    </section>

                    <section className="grid gap-4 rounded-xl border border-border bg-card/60 p-4 sm:p-5">
                        <h2 className="text-lg font-semibold">Login</h2>
                        <div className="grid gap-3">
                            <Field label="Identifier" value={loginForm.identifier} onChange={(identifier) => setLoginForm((form) => ({ ...form, identifier }))} />
                            <Field label="Password" type="password" value={loginForm.password} onChange={(password) => setLoginForm((form) => ({ ...form, password }))} />
                        </div>
                        <PrimaryButton
                            text="Login"
                            disabled={auth.isLoggingIn}
                            onClick={() => void runAction('Login', () => auth.login(loginForm))}
                        />
                    </section>

                    <section className="grid gap-4 rounded-xl border border-border bg-card/60 p-4 sm:p-5">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">API key hooks</h2>
                                <p className="text-sm text-muted-foreground">
                                    Listed keys: {apiKeys.data?.length ?? 0}
                                </p>
                            </div>
                            <NormalButton
                                text="Refetch"
                                styleType="soft"
                                onClick={() => void runAction('Refetch API keys', async () => apiKeys.refetch())}
                            />
                        </div>
                        <Field label="Project name" value={projectName} onChange={setProjectName} />
                        <div className="grid gap-2 sm:grid-cols-2">
                            <PrimaryButton
                                text="Create key"
                                disabled={createApiKey.isPending}
                                onClick={() => void runAction('Create API key', () => createApiKey.mutateAsync(projectName))}
                            />
                            <NormalButton
                                text="Rotate first key"
                                disabled={!firstKey || rotateApiKey.isPending}
                                onClick={() => firstKey && void runAction('Rotate API key', () => rotateApiKey.mutateAsync(firstKey.id))}
                            />
                            <NormalButton
                                text="Block first key"
                                styleType="soft"
                                disabled={!firstKey || updateApiKey.isPending}
                                onClick={() => firstKey && void runAction('Block API key', () => updateApiKey.mutateAsync({ id: firstKey.id, status: 'blocked' }))}
                            />
                            <NormalButton
                                text="Activate first key"
                                styleType="soft"
                                disabled={!firstKey || updateApiKey.isPending}
                                onClick={() => firstKey && void runAction('Activate API key', () => updateApiKey.mutateAsync({ id: firstKey.id, status: 'active' }))}
                            />
                            <NormalButton
                                text="Delete first key"
                                styleType="soft"
                                disabled={!firstKey || deleteApiKey.isPending}
                                onClick={() => firstKey && void runAction('Delete API key', () => deleteApiKey.mutateAsync(firstKey.id))}
                            />
                        </div>
                        {firstKey && (
                            <pre className="max-h-40 overflow-auto rounded-lg bg-background p-3 text-xs text-muted-foreground">
                                {JSON.stringify(firstKey, null, 2)}
                            </pre>
                        )}
                    </section>

                    <section className="grid gap-4 rounded-xl border border-border bg-card/60 p-4 sm:p-5">
                        <h2 className="text-lg font-semibold">Contact hook</h2>
                        <PrimaryButton
                            text="Send contact message"
                            disabled={contact.isPending}
                            onClick={() => void runAction('Send contact', () => contact.mutateAsync({
                                name: signupForm.name,
                                email: signupForm.email,
                                phone: signupForm.phone,
                                subject: 'Hook test message',
                                message: 'Testing contact hook from the temporary main page panel.',
                            }))}
                        />
                    </section>

                    <section className="grid gap-4 rounded-xl border border-border bg-card/60 p-4 sm:p-5 lg:col-span-2">
                        <h2 className="text-lg font-semibold">OTP hooks</h2>
                        <div className="grid gap-3 sm:grid-cols-3">
                            <Field label="Email" value={otpEmail} onChange={setOtpEmail} />
                            <Field label="OTP code" value={otpCode} onChange={setOtpCode} />
                            <Field label="New password" type="password" value={resetPasswordValue} onChange={setResetPasswordValue} />
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                            <NormalButton
                                text="Verify SMS"
                                disabled={verifySms.isPending}
                                onClick={() => void runAction('Verify SMS', () => verifySms.mutateAsync({ email: otpEmail, otp_code: otpCode }))}
                            />
                            <NormalButton
                                text="Resend verify OTP"
                                disabled={resendVerifyOtp.isPending}
                                onClick={() => void runAction('Resend verify OTP', () => resendVerifyOtp.mutateAsync({ email: otpEmail }))}
                            />
                            <NormalButton
                                text="Send reset OTP"
                                disabled={sendResetOtp.isPending}
                                onClick={() => void runAction('Send reset OTP', () => sendResetOtp.mutateAsync({ email: otpEmail }))}
                            />
                            <NormalButton
                                text="Reset password"
                                disabled={resetPassword.isPending}
                                onClick={() => void runAction('Reset password', () => resetPassword.mutateAsync({
                                    email: otpEmail,
                                    otp_code: otpCode,
                                    password: resetPasswordValue,
                                }))}
                            />
                        </div>
                    </section>
                </div>

                <section className="grid gap-3 rounded-xl border border-border bg-card/60 p-4 sm:p-5">
                    <h2 className="text-lg font-semibold">Request log</h2>
                    {logs.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No hook calls yet.</p>
                    ) : (
                        <div className="grid gap-2">
                            {logs.map((log) => (
                                <article key={log.id} className="rounded-lg border border-border bg-background p-3">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-sm font-semibold">{log.label}</p>
                                        <span className={log.status === 'success' ? 'text-xs text-[var(--success)]' : 'text-xs text-destructive'}>
                                            {log.status}
                                        </span>
                                    </div>
                                    <pre className="mt-2 max-h-32 overflow-auto whitespace-pre-wrap text-xs text-muted-foreground">
                                        {log.detail}
                                    </pre>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
