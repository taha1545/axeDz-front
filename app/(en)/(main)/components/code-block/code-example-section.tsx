'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CodeBlock } from './code-block';

type Language = 'node' | 'python';
type ApiTab = 'sms' | 'email' | 'wallet';

interface ExampleData {
    label: string;
    description: string;
    node: string;
    python: string;
}

const examples: Record<ApiTab, ExampleData> = {
    sms: {
        label: 'SMS API',
        description:
            'Send transactional and OTP messages to any Algerian number with high deliverability and real-time status tracking.',
        node: `const AxeDz = require("axedz");

const client = new AxeDz("YOUR_API_KEY");

// Send SMS
const response = await client.sms.send({
    to: "213XXXXXXXX",
    message: "Your verification code is 1234"
});

console.log(response);`,
        python: `!pip install axedz

from axedz import AxeDz

client = AxeDz("YOUR_API_KEY")

# Send SMS
response = client.sms.send(
    "+213XXXXXXXX",
    "Your verification code is 1234"
)

print("SMS Response:", response)`,
    },
    email: {
        label: 'Email API',
        description:
            'Send transactional and marketing emails with high deliverability. Track opens, clicks, and bounces in real-time.',
        node: `const AxeDz = require("axedz");

const client = new AxeDz("YOUR_API_KEY");

// Send Email
const response = await client.email.send({
    to: "user@example.com",
    subject: "Welcome to AxeDz",
    html: "<h1>Welcome!</h1>"
});

console.log(response);`,
        python: `!pip install axedz

from axedz import AxeDz

client = AxeDz("YOUR_API_KEY")

# Send Email
response = client.email.send(
    "user@example.com",
    "Welcome to AxeDz",
    text="Thanks for signing up!"
)

print("Email Response:", response)`,
    },
    wallet: {
        label: 'Wallet & Billing',
        description:
            'Manage wallet balances, create invoices, and handle local DZD payments. Automate billing workflows effortlessly.',
        node: `const AxeDz = require("axedz");

const client = new AxeDz("YOUR_API_KEY");

// Get balance
const wallet = await client.wallet.getBalance();
console.log(wallet);

// Get transactions
const txs = await client.wallet.getTransactions({
    limit: 10,
    offset: 0
});

console.log(txs);`,
        python: `!pip install axedz

from axedz import AxeDz

client = AxeDz("YOUR_API_KEY")

# Get balance
balance = client.wallet.balance()
print("Balance:", balance)

# Get transactions
txs = client.wallet.transactions(limit=10)
print("Transactions:", txs)`,
    },
};

const tabs: ApiTab[] = ['sms', 'email', 'wallet'];

export function CodeExampleSection() {
    //
    const [activeTab, setActiveTab] = useState<ApiTab>('sms');
    const [language, setLanguage] = useState<Language>('node');

    const current = examples[activeTab];

    return (
        <section id="use-cases" className="py-10 px-4 md:px-6 lg:px-8 bg-background scroll-mt-20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-sm md:text-2xl bg-foreground text-background px-4 py-5 rounded-lg  font-bold tracking-wide mb-3">
                        CODE EXAMPLE
                    </span>
                    <p className="text-muted-foreground text-lg">
                        Build flexible workflows with AxeDz CPaaS APIs
                    </p>
                </motion.div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="rounded-[2rem] border border-border bg-card overflow-hidden shadow-sm"
                >
                    {/* Top bar */}
                    <div className=" flex flex-col lg:flex-row lg:items-center justify-between px-6 md:px-8 py-5 border-b border-border gap-4">
                        <div className="flex items-center gap-3">
                            <span className="text-primary font-bold text-lg">AxeDz</span>
                            <span className="text-muted-foreground">|</span>
                            <span className="text-foreground font-medium">Communication Suite</span>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn(
                                        'px-4 py-2 rounded-full text-sm font-medium transition-all',
                                        activeTab === tab
                                            ? 'bg-primary text-primary-foreground shadow-md'
                                            : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                    )}
                                >
                                    {examples[tab].label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Body */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 min-h-100">
                        {/* Code Editor */}
                        <div className="lg:col-span-3 bg-[#0d1117] p-6 md:p-8 relative">
                            {/* Language toggle */}
                            <div className="absolute top-6 right-6 flex items-center bg-[#161b22] rounded-lg p-1 border border-[#30363d]">
                                <button
                                    onClick={() => setLanguage('node')}
                                    className={cn(
                                        'px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                                        language === 'node'
                                            ? 'bg-[#238636] text-white'
                                            : 'text-[#8b949e] hover:text-[#c9d1d9]'
                                    )}
                                >
                                    Node
                                </button>
                                <button
                                    onClick={() => setLanguage('python')}
                                    className={cn(
                                        'px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                                        language === 'python'
                                            ? 'bg-[#862384] text-white'
                                            : 'text-[#8b949e] hover:text-[#c9d1d9]'
                                    )}
                                >
                                    Python
                                </button>
                            </div>

                            <div className="mt-10">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`${activeTab}-${language}`}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <CodeBlock
                                            code={language === 'node' ? current.node : current.python}
                                            language={language}
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Description Panel */}
                        <div className="lg:col-span-2 p-8 md:p-10 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-border bg-card">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-2xl font-bold text-foreground mb-4">
                                        Code your own solutions
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed mb-8">
                                        {current.description}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-4">
                                        <a
                                            href="/docs"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-secondary transition-colors shadow-sm"
                                        >
                                            Explore docs
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}