import { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '../components/code-block';
import {
    DocCallout,
    DocHeading,
    DocList,
    DocSection,
    DocSubSection,
    DocTable,
} from '../components/doc-section';
import { PRICING } from '../components/docs-nav';

export const metadata: Metadata = {
    title: 'API Reference — AxeDz Docs',
};

export default function ApiReferencePage() {
    return (
        <>
            <DocHeading
                title="API Reference"
                description="Everything you need to integrate AxeDz into your app. All requests require your API key and return a simple JSON response."
            />

            <DocSection title="Base URL">
                <p>All API requests go to:</p>
                <CodeBlock language="bash" code="https://api.axedz.com/v1" />
            </DocSection>

            <DocSection title="Authentication">
                <p>Include your API key in every request:</p>
                <DocTable
                    headers={['Header', 'Required', 'Description']}
                    rows={[
                        ['X-API-Key', 'Yes', 'Your API key from the dashboard'],
                        ['Content-Type', 'Yes (POST)', 'application/json'],
                    ]}
                />
            </DocSection>

            <DocSection title="Response format">
                <DocSubSection title="Success">
                    <CodeBlock
                        language="json"
                        code={`{
  "success": true,
  "data": { }
}`}
                    />
                </DocSubSection>
                <DocSubSection title="Error">
                    <CodeBlock
                        language="json"
                        code={`{
  "success": false,
  "message": "Detailed error description"
}`}
                    />
                    <p>
                        See the{' '}
                        <Link href="/docs/errors" className="font-medium text-primary hover:text-secondary">
                            Errors guide
                        </Link>{' '}
                        for a full list of error codes and how to handle them.
                    </p>
                </DocSubSection>
            </DocSection>

            <DocSection id="sms" title="Send SMS">
                <p>
                    Send an SMS to any Algerian phone number. Costs {PRICING.sms.price} DZD per
                    message in production mode.
                </p>
                <CodeBlock
                    language="bash"
                    title="POST /sms/send"
                    code={`POST /v1/sms/send

{
  "to": "+213555123456",
  "message": "Your verification code is 482910"
}`}
                />
                <DocTable
                    headers={['Field', 'Type', 'Description']}
                    rows={[
                        ['to', 'string', 'Recipient phone number in international format (e.g. +213...)'],
                        ['message', 'string', 'The text message to send'],
                    ]}
                />
                <CodeBlock
                    language="json"
                    title="Response"
                    code={`{
  "success": true,
  "data": {
    "id": "sms_abc123",
    "status": "queued",
    "to": "+213555123456",
    "cost": ${PRICING.sms.price}
  }
}`}
                />
            </DocSection>

            <DocSection id="email" title="Send email">
                <p>
                    Send a transactional email to your customer. Costs {PRICING.email.price} DZD
                    per email in production mode.
                </p>
                <CodeBlock
                    language="bash"
                    title="POST /email/send"
                    code={`POST /v1/email/send

{
  "to": "user@example.com",
  "subject": "Welcome to AxeDz",
  "body": "<h1>Hello!</h1><p>Your account is ready.</p>"
}`}
                />
                <DocTable
                    headers={['Field', 'Type', 'Description']}
                    rows={[
                        ['to', 'string', 'Recipient email address'],
                        ['subject', 'string', 'Email subject line'],
                        ['body', 'string', 'Email content — HTML or plain text'],
                    ]}
                />
            </DocSection>

            <DocSection id="contacts" title="Contacts">
                <p>Save customer contact details for future messaging campaigns.</p>
                <CodeBlock
                    language="bash"
                    title="POST /contacts"
                    code={`POST /v1/contacts

{
  "name": "Ahmed Benali",
  "phone": "+213555123456",
  "email": "ahmed@example.com",
  "tags": ["customer", "premium"]
}`}
                />
                <CodeBlock language="bash" title="GET /contacts" code="GET /v1/contacts" />
            </DocSection>

            <DocSection id="wallet" title="Wallet">
                <p>Check your current balance and account mode.</p>
                <CodeBlock language="bash" code="GET /v1/wallet" />
                <CodeBlock
                    language="json"
                    title="Response"
                    code={`{
  "success": true,
  "data": {
    "balance": 12500,
    "currency": "DZD",
    "mode": "production"
  }
}`}
                />
            </DocSection>

            <DocSection id="logs" title="Message logs">
                <p>Review your sent messages, delivery status, and costs.</p>
                <DocList
                    items={[
                        'GET /v1/logs/sms — all SMS messages you have sent',
                        'GET /v1/logs/email — all emails you have sent',
                        'GET /v1/usage — summary of your usage and spending',
                    ]}
                />
                <DocTable
                    headers={['Field', 'Description']}
                    rows={[
                        ['id', 'Unique message ID'],
                        ['status', 'queued, sent, delivered, or failed'],
                        ['cost', 'Amount charged in DZD'],
                        ['created_at', 'When the message was sent'],
                    ]}
                />
            </DocSection>

            <DocSection id="storage" title="Cloud Storage (coming soon)">
                <DocCallout title="Coming soon">
                    Store files and media for your app. Pricing: {PRICING.storage.price} DZD per
                    GB. Join our waitlist from the dashboard to get early access.
                </DocCallout>
            </DocSection>

            <DocSection id="ai" title="AI Tokens (coming soon)">
                <DocCallout title="Coming soon">
                    AI-powered features billed at {PRICING.tokens.price} DZD per token. We will
                    announce availability on the dashboard.
                </DocCallout>
            </DocSection>

            <DocSection title="Rate limits">
                <p>
                    To keep the platform fast and fair for everyone, API requests are rate limited.
                    If you send too many requests in a short time, you will receive a 429 error.
                    Wait a moment and try again.
                </p>
            </DocSection>
        </>
    );
}
