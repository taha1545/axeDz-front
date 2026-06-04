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

export function HeroImage2() {
    return (
        <div
            style={{
                width: "100%",
                maxWidth: 680,
                minHeight: 450,
                display: "flex",
                flexDirection: "column",
                borderRadius: 20,
                background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
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
                    flexShrink: 0,
                }}
            >
                <div style={{ display: "flex ", gap: 10, alignItems: "center" }}>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#ff5f57" }} />
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#febc2e" }} />
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#28c840" }} />
                </div>

                <div
                    style={{
                        marginLeft: "auto",
                        background: "#F43F5E",
                        padding: "4px 14px",
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#fff",
                    }}
                >
                    401 Unauthorized
                </div>
            </div>

            {/* Code Area */}
            <div
                style={{
                    background: "var(--code)",
                    padding: "36px 32px",
                    flex: 1,
                }}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>

                    <div>
                        <CodeSpan style={syntax.keyword}>import</CodeSpan>{" "}
                        <CodeSpan style={syntax.variable}>axedz</CodeSpan>{" "}
                        <CodeSpan style={syntax.variable}>from</CodeSpan>{" "}
                        <CodeSpan style={syntax.variable}>AxeDz</CodeSpan>
                    </div>

                    <div style={{ height: 14 }} />

                    <div>
                        <CodeSpan style={syntax.comment}>
                            {`# Send Email via AxeDz API`}
                        </CodeSpan>
                    </div>

                    <div style={{ height: 5 }} />

                    <div>
                        <CodeSpan style={syntax.variable}>response</CodeSpan>{" "}
                        <CodeSpan style={syntax.operator}>=</CodeSpan>{" "}
                        <CodeSpan style={syntax.function}>axedz.mail.send</CodeSpan>
                        <CodeSpan style={syntax.punctuation}>(</CodeSpan>
                    </div>

                    <div style={{ paddingLeft: 28 }}>
                        <CodeSpan style={syntax.punctuation}>{"{"}</CodeSpan>
                    </div>

                    <div style={{ paddingLeft: 56 }}>
                        <CodeSpan style={syntax.string}>{`"to"`}</CodeSpan>
                        <CodeSpan style={syntax.punctuation}>:</CodeSpan>{" "}
                        <CodeSpan style={syntax.string}>{`"client@gmail.com"`}</CodeSpan>
                        <CodeSpan style={syntax.punctuation}>,</CodeSpan>
                    </div>

                    <div style={{ paddingLeft: 56 }}>
                        <CodeSpan style={syntax.string}>{`"message"`}</CodeSpan>
                        <CodeSpan style={syntax.punctuation}>:</CodeSpan>{" "}
                        <CodeSpan style={syntax.string}>
                            {`"Welcome To Client Service"`}
                        </CodeSpan>
                    </div>

                    <div style={{ paddingLeft: 28 }}>
                        <CodeSpan style={syntax.punctuation}>{"}"}</CodeSpan>
                    </div>

                    <div>
                        <CodeSpan style={syntax.punctuation}>{`)`}</CodeSpan>
                    </div>

                    <div style={{ height: 14 }} />

                    <div>
                        <CodeSpan style={syntax.variable}>print</CodeSpan>
                        <CodeSpan style={syntax.punctuation}>(</CodeSpan>
                        <CodeSpan style={syntax.variable}>response</CodeSpan>
                        <CodeSpan style={syntax.punctuation}>.json())</CodeSpan>
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
                <span>python</span>
                <span>Pip</span>
                <span>Json</span>
                <span style={{ marginLeft: "auto" }}>Ln 13, Col 42</span>
            </div>
        </div>
    );
}