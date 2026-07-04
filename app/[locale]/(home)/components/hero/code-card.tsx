import { cn } from "@/lib/utils";

type CodeTheme = "dark" | "light" | "auto";

interface CodeCardProps {
    code: string;
    language?: "javascript" | "python" | "typescript";
    filename?: string;
    status?: string;
    theme?: CodeTheme;
    size?: "sm" | "md" | "lg";
    className?: string;
    style?: React.CSSProperties;
}

const themes = {
    dark: {
        bg: "bg-[#0d1117]",
        header: "bg-[#161b22]",
        text: "text-[#c9d1d9]",
        dim: "text-[#6e7681]",
        status: "bg-[#00c11d]",
    },
    light: {
        bg: "bg-[#111827]",
        header: "bg-[#1a2029]",
        text: "text-[#e5e7eb]",
        dim: "text-[#9ca3af]",
        status: "bg-[#04a61c]",
    },
};

const sizes = {
    sm: {
        font: "text-[11px]",
        padding: "p-4",
        header: "h-10",
        dot: "w-2.5 h-2.5",
    },
    md: {
        font: "text-[13px]",
        padding: "p-5",
        header: "h-12",
        dot: "w-3 h-3",
    },
    lg: {
        font: "text-[15px]",
        padding: "p-6",
        header: "h-14",
        dot: "w-3.5 h-3.5",
    },
};

function tokenizeCode(
    code: string,
    language: string
): Array<{ type: string; content: string }> {
    const tokens: Array<{ type: string; content: string }> = [];

    if (!code) return tokens;

    const regex =
        /(\s+|[a-zA-Z_][a-zA-Z0-9_]*|\d+|".*?"|'.*?'|[{}()\[\];:,.=+\-*/<>!&|]+)/g;

    let match;

    while ((match = regex.exec(code)) !== null) {
        const token = match[0];
        let type = "plain";

        if (/^\s+$/.test(token)) {
            type = "space";
        } else if (
            language === "python" &&
            /^(import|from|def|class|return|async|await|if|else|for|while|try|except|with|as|pass|None|True|False|and|or|not|in|is|lambda|yield|raise|break|continue|self|cls)$/.test(
                token
            )
        ) {
            type = "keyword";
        } else if (
            /^(const|let|var|function|return|async|await|new|import|from|export|default|if|else|for|while|try|catch|class|extends)$/.test(
                token
            )
        ) {
            type = "keyword";
        } else if (
            /^(require|console|log|send|map|filter|reduce|axios|fetch|Client|axedz)$/.test(
                token
            )
        ) {
            type = "function";
        } else if (/^".*?"$/.test(token) || /^'.*?'$/.test(token)) {
            type = "string";
        } else if (/^\d+$/.test(token)) {
            type = "number";
        } else if (/^[{}()\[\];:,.=+\-*/<>!&|]+$/.test(token)) {
            type = "punctuation";
        }

        tokens.push({ type, content: token });
    }

    return tokens;
}

const tokenColors: Record<string, string> = {
    keyword: "text-[#ff7b72] font-semibold",
    function: "text-[#d2a8ff]",
    string: "text-[#a5d6ff]",
    number: "text-[#79c0ff]",
    comment: "text-[#8b949e] italic opacity-60",
    punctuation: "text-[#c9d1d9]",
    plain: "text-[#c9d1d9]",
    space: "",
};

export function CodeCard({
    code,
    language = "javascript",
    filename,
    status = "200 OK",
    theme = "auto",
    size = "lg",
    className,
    style,
}: CodeCardProps) {
    const resolvedTheme = theme === "auto" ? "dark" : theme;
    const t = themes[resolvedTheme];
    const s = sizes[size];

    const lines = code.split("\n");

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-3xl",
                "border border-white/10",
                "shadow-[0_25px_20px_rgba(0,0,0,0.40)]",
                t.bg,
                className
            )}
            style={style}
        >
            {/* Top accent line */}
            <div className="h-0.75 w-full bg-linear-to-r from-transparent via-blue-800 to-transparent dark:via-blue-500/70" />

            {/* Header */}
            <div
                className={cn(
                    "flex items-center px-6 gap-3 border-b border-white/5",
                    s.header,
                    t.header
                )}
            >
                <div className="flex gap-2">
                    <span className={cn("rounded-full bg-[#ff5f57]", s.dot)} />
                    <span className={cn("rounded-full bg-[#febc2e]", s.dot)} />
                    <span className={cn("rounded-full bg-[#00c11d]", s.dot)} />
                </div>

                {filename && (
                    <span className={cn("text-md  ml-1 font-medium", t.dim)}>
                        {filename}
                    </span>
                )}

                <span
                    className={cn(
                        "ml-auto text-[12px] font-semibold text-white px-4 py-2 rounded-full",
                        t.status
                    )}
                >
                    {status}
                </span>
            </div>

            {/* Code */}
            <div
                className={cn(
                    s.padding,
                    "overflow-auto",
                    "min-h-85",
                    "max-h-112"
                )}
            >
                <pre
                    className={cn(
                        "font-mono leading-8 tracking-wide",
                        s.font,
                        t.text
                    )}
                >
                    {lines.map((line, lineIndex) => (
                        <div key={lineIndex} className="flex">
                            <span
                                className="
                                    select-none
                                    w-3
                                    text-right
                                    mr-5
                                    text-[#484f58]
                                    font-medium
                                "
                            >
                                {lineIndex + 1}
                            </span>

                            <code>
                                {tokenizeCode(line, language).map(
                                    (token, tokenIndex) =>
                                        token.type === "space" ? (
                                            <span key={tokenIndex}>
                                                {token.content}
                                            </span>
                                        ) : (
                                            <span
                                                key={tokenIndex}
                                                className={
                                                    tokenColors[token.type] ??
                                                    tokenColors.plain
                                                }
                                            >
                                                {token.content}
                                            </span>
                                        )
                                )}
                            </code>
                        </div>
                    ))}
                </pre>
            </div>

            {/* Footer */}
            <div
                className={cn(
                    "h-10 flex items-center px-6 gap-4 text-xs",
                    "border-t border-white/5",
                    t.dim,
                    t.header
                )}
            >
                <span className="capitalize">{language}</span>
                <span>UTF-8</span>
                <span className="ml-auto">
                    Ln {lines.length}, Col 1
                </span>
            </div>
        </div>
    );
}