import { Metadata } from 'next';
import { CodeBlock } from '../components/code-block';
import {
    DocCallout,
    DocHeading,
    DocList,
    DocSection,
    DocSubSection,
    DocTable,
} from '../components/doc-section';

export const metadata: Metadata = {
    title: 'Authentication — AxeDz Docs',
};

export default function AuthenticationPage() {
    return (
        <>
            <DocHeading
                title="Authentication"
                description="Learn how to sign in to your dashboard and how to authenticate API requests using your API key."
            />

            <DocSection title="Signing in to your dashboard">
                <p>
                    Access your AxeDz account through the dashboard using your email and password,
                    or sign in quickly with your Google account. Your session stays secure and you
                    can sign out at any time.
                </p>
                <DocList
                    items={[
                        'Sign up with email and password',
                        'Sign in with Google for faster access',
                        'Verify your phone or email with a one-time code (OTP)',
                        'Reset your password if you forget it',
                    ]}
                />
            </DocSection>

            <DocSection title="Using your API key">
                <p>
                    To send SMS or email through the API, you need an API key. Create one from
                    your dashboard under Projects. Each key is tied to a project and your wallet
                    balance.
                </p>
                <DocTable
                    headers={['What you need to know', 'Details']}
                    rows={[
                        ['Where to find it', 'Dashboard → Projects → API Keys'],
                        ['How to use it', 'Add it to the X-API-Key header on every request'],
                        ['If it is compromised', 'Revoke it immediately and create a new one'],
                        ['Status', 'Active keys work; revoked keys are blocked instantly'],
                    ]}
                />
                <DocSubSection title="Example request header">
                    <CodeBlock
                        language="http"
                        code={`X-API-Key: 550e8400-e29b-41d4-a716-446655440000`}
                    />
                </DocSubSection>
                <DocCallout title="Keep your key safe">
                    Never share your API key publicly or embed it in mobile apps or frontend code.
                    If you think your key has been exposed, revoke it from the dashboard right away
                    and create a new one.
                </DocCallout>
            </DocSection>

            <DocSection title="Managing your API keys">
                <DocList
                    items={[
                        'Create — generate a new key for each project or environment',
                        'Use — include the key in the X-API-Key header with every API call',
                        'Revoke — disable a key instantly if it is no longer needed or was exposed',
                        'Rotate — create a new key, update your app, then revoke the old one',
                    ]}
                />
            </DocSection>

            <DocSection title="Sandbox and production modes">
                <p>
                    Every project runs in either sandbox or production mode. This controls whether
                    messages are actually sent and whether your wallet is charged.
                </p>
                <DocTable
                    headers={['Mode', 'What happens']}
                    rows={[
                        ['Sandbox', 'Free testing — messages are simulated, nothing is charged'],
                        ['Production', 'Live sending — real messages are delivered and your wallet is charged'],
                    ]}
                />
                <p>
                    Switch between modes anytime from your dashboard. We recommend testing
                    thoroughly in sandbox before going live.
                </p>
            </DocSection>

            <DocSection title="Account verification (OTP)">
                <p>
                    When you sign up, we send a one-time code to your phone or email to confirm
                    your identity. You may also be asked to verify your identity for sensitive
                    account actions.
                </p>
                <DocList
                    items={[
                        'A code is sent to your phone via SMS or to your email',
                        'Enter the code within the time limit to verify your account',
                        'If you do not receive the code, you can request a new one',
                    ]}
                />
            </DocSection>
        </>
    );
}
