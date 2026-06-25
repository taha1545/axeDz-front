'use client';

export type ApiTab = 'sms' | 'email' | 'wallet';

export interface CodeSample {
    node: string;
    python: string;
}

export const codeSamples: Record<ApiTab, CodeSample> = {
    sms: {
        node: `const AxeDz = require("axedz");

const client = new AxeDz("YOUR_API_KEY");

// Send SMS
const response = await client.sms.send({
    to: "213XXXXXXXX",
    message: "Your verification code is 1234"
});

console.log(response);`,
        python: `from axedz import AxeDz

client = AxeDz("YOUR_API_KEY")

# Send SMS
response = client.sms.send(
    "+213XXXXXXXX",
    "Your verification code is 1234"
)

print("SMS Response:", response)`,
    },
    email: {
        node: `const AxeDz = require("axedz");

const client = new AxeDz("YOUR_API_KEY");

// Send Email
const response = await client.email.send({
    to: "user@example.com",
    subject: "Welcome to AxeDz",
    html: "<h1>Welcome!</h1>"
});
`,
        python: `from axedz import AxeDz

client = AxeDz("YOUR_API_KEY")

# Send Email
response = client.email.send(
    "user@example.com",
    "Welcome to AxeDz",
    text="Thanks for signing up!"
)
`,
    },
    wallet: {
        node: `
const AxeDz = require("axedz");

const client = new AxeDz("YOUR_API_KEY");

// Get balance
const wallet = await client.wallet.getBalance();

console.log(wallet);

`,
        python: `
from axedz import AxeDz

client = AxeDz("YOUR_API_KEY")

# Get balance
balance = client.wallet.balance()

print("Balance:", balance)

`,
    },
};

export const tabs: ApiTab[] = ['sms', 'email', 'wallet'];