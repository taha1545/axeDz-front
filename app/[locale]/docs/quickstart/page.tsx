import { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '../components/code-block';
import {
    DocCallout,
    DocHeading,
    DocList,
    DocSection,
    DocSubSection,
} from '../components/doc-section';

export const metadata: Metadata = {
    title: 'Quickstart — AxeDz Docs',
};

export default function QuickstartPage() {
    return (
        <>
            <DocHeading
                title="Quickstart"
                description="Get up and running in minutes. Create your account, grab an API key, and send your first SMS or email."
            />

            <DocSection title="1. Create your account">
                <p>
                    Sign up for free at the{' '}
                    <Link href="/dashboard" className="font-medium text-primary hover:text-secondary">
                        dashboard
                    </Link>
                    . Verify your email or phone number, and you will start in sandbox mode — a
                    free testing environment where no real messages are sent and nothing is charged.
                </p>
            </DocSection>

            <DocSection title="2. Create an API key">
                <p>
                    In your dashboard, create a project and generate an API key. You will use this
                    key to authenticate every request you send to AxeDz.
                </p>
                <DocList
                    items={[
                        'Each project can have its own API key',
                        'You can revoke a key at any time if it is compromised',
                        'Include your key in the X-API-Key header with every request',
                    ]}
                />
            </DocSection>

            <DocSection title="3. Install the SDK (optional)">
                <p>
                    Our SDKs make integration easier by handling authentication and errors for you.
                    You can also use cURL or any HTTP client if you prefer.
                </p>
                <DocSubSection title="Node.js">
                    <CodeBlock
                        language="bash"
                        code={`npm install axedz`}
                    />
                </DocSubSection>
                <DocSubSection title="Python">
                    <CodeBlock
                        language="bash"
                        code={`pip install axedz`}
                    />
                </DocSubSection>
                <p>
                    See the{' '}
                    <Link href="/docs/sdk" className="font-medium text-primary hover:text-secondary">
                        SDK guide
                    </Link>{' '}
                    for complete examples.
                </p>
            </DocSection>

            <DocSection title="4. Send your first SMS">
                <DocSubSection title="Using cURL">
                    <CodeBlock
                        language="bash"
                        code={`curl -X POST https://api.axedz.com/v1/sms/send \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -d '{
    "to": "+213555123456",
    "message": "Hello from AxeDz!"
  }'`}
                    />
                </DocSubSection>
                <DocSubSection title="Using the Node.js SDK">
                    <CodeBlock
                        language="node"
                        code={`const AxeDz = require("axedz");

const client = new AxeDz("YOUR_API_KEY");

const result = await client.sms.send({
  to: "+213555123456",
  message: "Hello from AxeDz!",
});

console.log(result);`}
                    />
                </DocSubSection>
            </DocSection>

            <DocSection title="5. Send your first email">
                <CodeBlock
                    language="bash"
                    code={`curl -X POST https://api.axedz.com/v1/email/send \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -d '{
    "to": "user@example.com",
    "subject": "Welcome to AxeDz",
    "body": "Your account is ready."
  }'`}
                />
            </DocSection>

            <DocSection title="6. Go live">
                <p>
                    When you are ready to send real messages, top up your wallet through SATIM in
                    the dashboard, then switch your project from sandbox to production mode.
                </p>
                <DocCallout title="Sandbox vs production">
                    Sandbox is free and simulates delivery — perfect for testing. Production sends
                    real messages and deducts the cost from your wallet balance.
                </DocCallout>
            </DocSection>

            <DocSection title="Understanding responses">
                <p>Every API response follows the same format:</p>
                <CodeBlock
                    language="json"
                    code={`{
  "success": true,
  "data": {
    "id": "msg_abc123",
    "status": "queued"
  }
}`}
                />
                <p>
                    If something goes wrong, you will get{' '}
                    <code className="text-foreground">success: false</code> with a clear{' '}
                    <code className="text-foreground">message</code> explaining what happened. See
                    the{' '}
                    <Link href="/docs/errors" className="font-medium text-primary hover:text-secondary">
                        Errors guide
                    </Link>{' '}
                    for details.
                </p>
            </DocSection>
        </>
    );
}
