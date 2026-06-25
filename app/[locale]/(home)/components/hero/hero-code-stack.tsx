"use client";

import { motion } from "framer-motion";
import { CodeCard } from "./code-card";

const NODE_CODE = `const AxeDz = require("axedz");

const client = new AxeDz("YOUR_API_KEY");


// Send SMS via AxeDz CPaaS platform
const response = await client.sms.send({
    provider: "axeDZ "
    to: "213XXXXXXXX",
    message: " Your verification is code : 123" 
    
});`;

export function HeroCodeStack() {
    return (
        <div className="relative flex items-center justify-center pl-[12%]">
            <motion.div
                className="w-full min-w-130"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                <div className="hidden dark:flex w-full">
                    <CodeCard
                        code={NODE_CODE}
                        language="javascript"
                        filename="sms.js"
                        status="200 OK"
                        size="lg"
                        theme="dark"
                    />
                </div>
                <div className="flex dark:hidden w-full">
                    <CodeCard
                        code={NODE_CODE}
                        language="javascript"
                        filename="sms.js"
                        status="200 OK"
                        size="lg"
                        theme="light"
                    />
                </div>

            </motion.div>
        </div>
    );
}