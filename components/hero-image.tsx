'use client';

import React from "react";

const syntax = {
    keyword: { color: "#ff7b72", fontWeight: 600 },
    function: { color: "#d2a8ff" },
    string: { color: "#a5d6ff" },
    comment: { color: "#8b949e", fontStyle: "italic" },
    variable: { color: "#79c0ff" },
    property: { color: "#79c0ff" },
    punctuation: { color: "#c9d1d9" },
    operator: { color: "#ff7b72" },
    plain: { color: "#c9d1d9" },
};

const CodeSpan: React.FC<{ style: React.CSSProperties; children: React.ReactNode }> = ({ style, children }) => (
    <span
        style={{
            ...style,
            fontFamily:
                "'SF Mono','Fira Code','JetBrains Mono',Monaco,'Cascadia Code','Roboto Mono',Consolas,monospace",
            fontSize: 14,
        }}
    >
        {children}
    </span>
);

export function HeroImage() {
    return (
        //
        <div
            style={{
                width: "100%",
                maxWidth: 680,
                minHeight: 450,
                display: "flex",
                flexDirection: "column",
                borderRadius: 20,
                background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
                boxShadow: "20px 12px 40px rgba(0,0,0,0.5)",
                border: "1.5px solid #2a2a40",
                overflow: "hidden",
                fontFamily:
                    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',sans-serif",
            }}
        >
            {/* Title Bar */}
            <div
                style={{
                    height: 52,
                    background: "#141424",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 20px",
                    position: "relative",
                    flexShrink: 0, // ✅ FIX
                }}
            >
                <div style={{ display: "flex ", gap: 10, alignItems: "center" }}>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#ff5f57" }} />
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#febc2e" }} />
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#28c840" }} />
                </div>
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: 10,
                        fontWeight: 500,
                        color: "#6e7681",
                        whiteSpace: "nowrap",
                    }}
                >
                    Code your own solutions : node
                </div>
                <div
                    style={{
                        marginLeft: "auto",
                        background: "#238636",
                        padding: "4px 14px",
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#fff",
                    }}
                >
                    200 OK
                </div>
            </div>

            {/* Code Area */}
            <div
                style={{
                    background: "var(--code)",
                    padding: "36px 32px",

                    flex: 1,
                    overflow: "auto",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div>
                        <CodeSpan style={syntax.keyword}>const</CodeSpan>{" "}
                        <CodeSpan style={syntax.variable}>AxeDz</CodeSpan>{" "}
                        <CodeSpan style={syntax.operator}>=</CodeSpan>{" "}
                        <CodeSpan style={syntax.function}>require</CodeSpan>
                        <CodeSpan style={syntax.punctuation}>(</CodeSpan>
                        <CodeSpan style={syntax.string}>{`"axedz"`}</CodeSpan>
                        <CodeSpan style={syntax.punctuation}>);</CodeSpan>
                    </div>

                    <div style={{ height: 14 }} />

                    <div>
                        <CodeSpan style={syntax.keyword}>const</CodeSpan>{" "}
                        <CodeSpan style={syntax.variable}>client</CodeSpan>{" "}
                        <CodeSpan style={syntax.operator}>=</CodeSpan>{" "}
                        <CodeSpan style={syntax.keyword}>new</CodeSpan>{" "}
                        <CodeSpan style={syntax.function}>AxeDz</CodeSpan>
                        <CodeSpan style={syntax.punctuation}>(</CodeSpan>
                        <CodeSpan style={syntax.string}>{`"YOUR_API_KEY"`}</CodeSpan>
                        <CodeSpan style={syntax.punctuation}>);</CodeSpan>
                    </div>

                    <div style={{ height: 14 }} />

                    <div>
                        <CodeSpan style={syntax.comment}>
                            {`// Send SMS via AxeDz CPaaS platform`}
                        </CodeSpan>
                    </div>

                    <div>
                        <CodeSpan style={syntax.keyword}>const</CodeSpan>{" "}
                        <CodeSpan style={syntax.variable}>response</CodeSpan>{" "}
                        <CodeSpan style={syntax.operator}>=</CodeSpan>{" "}
                        <CodeSpan style={syntax.keyword}>await</CodeSpan>{" "}
                        <CodeSpan style={syntax.variable}>client</CodeSpan>
                        <CodeSpan style={syntax.punctuation}>.</CodeSpan>
                        <CodeSpan style={syntax.property}>sms</CodeSpan>
                        <CodeSpan style={syntax.punctuation}>.</CodeSpan>
                        <CodeSpan style={syntax.function}>send</CodeSpan>
                        <CodeSpan style={syntax.punctuation}>({"{"})</CodeSpan>
                    </div>

                    <div style={{ paddingLeft: 28 }}>
                        <CodeSpan style={syntax.property}>to</CodeSpan>
                        <CodeSpan style={syntax.punctuation}>:</CodeSpan>{" "}
                        <CodeSpan style={syntax.string}>{`"213XXXXXXXX"`}</CodeSpan>
                        <CodeSpan style={syntax.punctuation}>,</CodeSpan>
                    </div>

                    <div style={{ paddingLeft: 28 }}>
                        <CodeSpan style={syntax.property}>message</CodeSpan>
                        <CodeSpan style={syntax.punctuation}>:</CodeSpan>{" "}
                        <CodeSpan style={syntax.string}>
                            {`"Your verification code is 1234"`}
                        </CodeSpan>
                    </div>

                    <div>
                        <CodeSpan style={syntax.punctuation}>{`)`};</CodeSpan>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div
                style={{
                    height: 28,
                    background: "#0f0f1a",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 16px",
                    fontSize: 10,
                    color: "#c9d1d9",
                    gap: 20,
                    flexShrink: 0,
                }}
            >
                <span>Node.js</span>
                <span>JavaScript</span>
                <span>UTF-8</span>
                <span style={{ marginLeft: "auto" }}>Ln 13, Col 42</span>
            </div>
        </div>
    );
}