import { Metadata } from 'next';
import { CodeBlock } from '../components/code-block';
import {
    DocCallout,
    DocHeading,
    DocList,
    DocSection,
    DocSubSection,
} from '../components/doc-section';

export const metadata: Metadata = {
    title: 'SDK — AxeDz Docs',
};

export default function SdkPage() {
    return (
        <>
            <DocHeading
                title="SDK"
                description="Use our official libraries to integrate AxeDz into your app quickly. They handle authentication, retries, and error messages so you can focus on your product."
            />

            <DocCallout title="Available languages">
                Official SDKs are available for Node.js and Python. SDKs for PHP and other
                languages are coming soon — you can always use the REST API directly in the meantime.
            </DocCallout>

            <DocSection id="nodejs" title="Node.js">
                <DocSubSection title="Installation">
                    <CodeBlock language="bash" code="npm install axedz" />
                </DocSubSection>
                <DocSubSection title="Set up your client">
                    <CodeBlock
                        language="node"
                        code={`const AxeDz = require("axedz");

const client = new AxeDz(process.env.AXEDZ_API_KEY);`}
                    />
                </DocSubSection>
                <DocSubSection title="Send an SMS">
                    <CodeBlock
                        language="node"
                        code={`const sms = await client.sms.send({
  to: "+213555123456",
  message: "Your OTP is 482910",
});

console.log(sms.id, sms.status);`}
                    />
                </DocSubSection>
                <DocSubSection title="Send an email">
                    <CodeBlock
                        language="node"
                        code={`const email = await client.email.send({
  to: "user@example.com",
  subject: "Password reset",
  body: "<p>Click the link to reset your password.</p>",
});

console.log(email.id, email.status);`}
                    />
                </DocSubSection>
                <DocSubSection title="Check your balance">
                    <CodeBlock
                        language="node"
                        code={`const wallet = await client.wallet.get();
console.log(wallet.balance, wallet.currency); // balance in DZD`}
                    />
                </DocSubSection>
            </DocSection>

            <DocSection id="python" title="Python">
                <DocSubSection title="Installation">
                    <CodeBlock language="bash" code="pip install axedz" />
                </DocSubSection>
                <DocSubSection title="Set up your client">
                    <CodeBlock
                        language="python"
                        code={`from axedz import AxeDz
import os

client = AxeDz(os.environ["AXEDZ_API_KEY"])`}
                    />
                </DocSubSection>
                <DocSubSection title="Send an SMS">
                    <CodeBlock
                        language="python"
                        code={`sms = client.sms.send(
    to="+213555123456",
    message="Your OTP is 482910",
)

print(sms.id, sms.status)`}
                    />
                </DocSubSection>
                <DocSubSection title="Send an email">
                    <CodeBlock
                        language="python"
                        code={`email = client.email.send(
    to="user@example.com",
    subject="Password reset",
    body="<p>Click the link to reset your password.</p>",
)

print(email.id, email.status)`}
                    />
                </DocSubSection>
            </DocSection>

            <DocSection title="Handling errors">
                <p>
                    When a request fails, the SDK throws a clear error so you know exactly what
                    went wrong and how to fix it:
                </p>
                <DocList
                    items={[
                        'ValidationError — something is wrong with your request (e.g. invalid phone number)',
                        'AuthorizationError — your API key is missing, invalid, or revoked',
                        'NotFoundError — the resource you requested does not exist',
                    ]}
                />
                <CodeBlock
                    language="node"
                    code={`try {
  await client.sms.send({ to: "invalid", message: "Hi" });
} catch (err) {
  if (err.code === "ValidationError") {
    console.error(err.message);
  }
}`}
                />
            </DocSection>
        </>
    );
}
