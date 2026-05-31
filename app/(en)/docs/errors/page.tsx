import { Metadata } from 'next';
import { CodeBlock } from '../components/code-block';
import {
    DocHeading,
    DocSection,
    DocSubSection,
    DocTable,
} from '../components/doc-section';

export const metadata: Metadata = {
    title: 'Errors — AxeDz Docs',
};

export default function ErrorsPage() {
    return (
        <>
            <DocHeading
                title="Errors"
                description="When something goes wrong, AxeDz returns a clear error message so you know exactly what happened and how to fix it."
            />

            <DocSection title="Error response format">
                <p>All errors follow the same structure:</p>
                <CodeBlock
                    language="json"
                    code={`{
  "success": false,
  "message": "Detailed error description"
}`}
                />
            </DocSection>

            <DocSection title="HTTP status codes">
                <DocTable
                    headers={['Code', 'Meaning', 'What to do']}
                    rows={[
                        ['200', 'Success', 'Your request worked'],
                        ['201', 'Created', 'Your resource was created successfully'],
                        ['400', 'Bad Request', 'Check your request — a field may be missing or invalid'],
                        ['401', 'Unauthorized', 'Check your API key — it may be missing, wrong, or revoked'],
                        ['403', 'Forbidden', 'Your balance may be too low, or you lack permission'],
                        ['404', 'Not Found', 'The resource you requested does not exist'],
                        ['429', 'Too Many Requests', 'Slow down — you are sending requests too quickly'],
                        ['500', 'Server Error', 'Something went wrong on our end — try again shortly'],
                        ['502', 'Delivery Failed', 'The message provider could not deliver — check the logs'],
                        ['503', 'Unavailable', 'We are temporarily down for maintenance — try again later'],
                    ]}
                />
            </DocSection>

            <DocSection title="Common errors">
                <DocSubSection title="Invalid API key">
                    <p>Your API key is missing, incorrect, or has been revoked.</p>
                    <CodeBlock
                        language="json"
                        code={`// HTTP 401
{
  "success": false,
  "message": "Invalid or revoked API key"
}`}
                    />
                </DocSubSection>

                <DocSubSection title="Insufficient balance">
                    <p>Your wallet does not have enough credit to send this message.</p>
                    <CodeBlock
                        language="json"
                        code={`// HTTP 403
{
  "success": false,
  "message": "Insufficient wallet balance. Current: 5 DZD, Required: 2 DZD"
}`}
                    />
                </DocSubSection>

                <DocSubSection title="Invalid request">
                    <p>A required field is missing or a value is in the wrong format.</p>
                    <CodeBlock
                        language="json"
                        code={`// HTTP 400
{
  "success": false,
  "message": "Field 'to' is required"
}`}
                    />
                </DocSubSection>

                <DocSubSection title="Rate limit exceeded">
                    <p>You are sending too many requests. Wait before trying again.</p>
                    <CodeBlock
                        language="json"
                        code={`// HTTP 429
{
  "success": false,
  "message": "Rate limit exceeded. Retry after 60 seconds"
}`}
                    />
                </DocSubSection>
            </DocSection>

            <DocSection title="Message delivery status">
                <p>
                    After you send a message, it goes through several stages. You can track the
                    status in your dashboard or via the logs API.
                </p>
                <DocTable
                    headers={['Status', 'What it means']}
                    rows={[
                        ['queued', 'Your message was accepted and is waiting to be sent'],
                        ['sent', 'The message was handed off to the carrier or email provider'],
                        ['delivered', 'The message reached the recipient successfully'],
                        ['failed', 'Delivery failed — check the logs for details'],
                    ]}
                />
            </DocSection>

            <DocSection title="Handling errors in your app">
                <p>Here is a simple pattern for handling API errors in your code:</p>
                <CodeBlock
                    language="node"
                    code={`const response = await fetch("https://api.axedz.com/v1/sms/send", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": process.env.AXEDZ_API_KEY,
  },
  body: JSON.stringify({ to: "+213555123456", message: "Hi" }),
});

const body = await response.json();

if (!body.success) {
  switch (response.status) {
    case 401:
      // Check or replace your API key
      break;
    case 403:
      // Ask the user to top up their wallet
      break;
    case 429:
      // Wait and retry
      break;
    default:
      console.error(body.message);
  }
}`}
                />
            </DocSection>
        </>
    );
}
