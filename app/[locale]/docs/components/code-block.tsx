'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

type CodeLanguage = 'bash' | 'node' | 'python' | 'json' | 'http';

interface CodeBlockProps {
    code: string;
    language?: CodeLanguage;
    title?: string;
    className?: string;
    showLineNumbers?: boolean;
}

interface TokenPattern {
    regex: RegExp;
    className: string;
}

const LANGUAGE_LABELS: Record<CodeLanguage, string> = {
    bash: 'bash',
    node: 'Node.js',
    python: 'Python',
    json: 'JSON',
    http: 'HTTP',
};

const PATTERNS: Record<CodeLanguage, TokenPattern[]> = {
    bash: [
        { regex: /#.*/g, className: 'text-[#8b949e]' },
        { regex: /(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/g, className: 'text-[#a5d6ff]' },
        { regex: /\b(curl|npm|pip|install|sudo|cd|export)\b/g, className: 'text-[#ff7b72]' },
        { regex: /\b(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\b/g, className: 'text-[#ff7b72]' },
        { regex: /-[A-Za-z]+\b/g, className: 'text-[#79c0ff]' },
        { regex: /https?:\/\/[^\s'"\\]+/g, className: 'text-[#a5d6ff]' },
        { regex: /\\$/g, className: 'text-[#8b949e]' },
    ],
    node: [
        { regex: /\/\/.*/g, className: 'text-[#8b949e]' },
        { regex: /(['"`])(?:\\.|(?!\1)[^\\\r\n])*\1/g, className: 'text-[#a5d6ff]' },
        {
            regex: /\b(const|let|var|new|require|import|from|return|async|await|function|class|if|else|for|while|try|catch|throw|typeof|instanceof|delete|in|of|export|default)\b/g,
            className: 'text-[#ff7b72]',
        },
        { regex: /\b(true|false|null|undefined|NaN|Infinity)\b/g, className: 'text-[#79c0ff]' },
        { regex: /\b\d+(?:\.\d+)?\b/g, className: 'text-[#79c0ff]' },
        {
            regex: /\b(console|process|Buffer|JSON|Math|Date|Promise|Array|Object|String|Number|Boolean|AxeDz)\b/g,
            className: 'text-[#d2a8ff]',
        },
        { regex: /[{}[\](),.;:]/g, className: 'text-[#c9d1d9]' },
    ],
    python: [
        { regex: /#.*/g, className: 'text-[#8b949e]' },
        { regex: /(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/g, className: 'text-[#a5d6ff]' },
        {
            regex: /\b(def|class|import|from|return|if|else|elif|for|while|try|except|with|as|pass|break|continue|lambda|yield|raise|assert|del|global|nonlocal|and|or|not|in|is|None|True|False|async|await)\b/g,
            className: 'text-[#ff7b72]',
        },
        { regex: /\b\d+(?:\.\d+)?\b/g, className: 'text-[#79c0ff]' },
        {
            regex: /\b(print|len|range|enumerate|zip|map|filter|sum|min|max|int|str|float|list|dict|tuple|set|open|type|isinstance|AxeDz)\b/g,
            className: 'text-[#d2a8ff]',
        },
        { regex: /[{}[\](),.;:]/g, className: 'text-[#c9d1d9]' },
    ],
    json: [
        { regex: /"([^"\\]|\\.)*"(?=\s*:)/g, className: 'text-[#79c0ff]' },
        { regex: /"([^"\\]|\\.)*"/g, className: 'text-[#a5d6ff]' },
        { regex: /\b(true|false|null)\b/g, className: 'text-[#ff7b72]' },
        { regex: /\b-?\d+(?:\.\d+)?\b/g, className: 'text-[#79c0ff]' },
        { regex: /[{}[\]:,]/g, className: 'text-[#c9d1d9]' },
    ],
    http: [
        { regex: /^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\b/gm, className: 'text-[#ff7b72]' },
        { regex: /^[A-Za-z-]+(?=:)/gm, className: 'text-[#79c0ff]' },
        { regex: /\b\d{3}\b/g, className: 'text-[#79c0ff]' },
        { regex: /(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/g, className: 'text-[#a5d6ff]' },
        { regex: /https?:\/\/[^\s'"\\]+/g, className: 'text-[#a5d6ff]' },
    ],
};

function HighlightedLine({ line, patterns }: { line: string; patterns: TokenPattern[] }) {
    if (!line) return <span>&nbsp;</span>;

    const tokens: { text: string; className?: string }[] = [];
    let remaining = line;

    while (remaining.length > 0) {
        let earliest: { index: number; match: string; className: string } | null = null;

        for (const pattern of patterns) {
            const regex = new RegExp(
                pattern.regex.source,
                pattern.regex.flags.includes('g') ? pattern.regex.flags : `${pattern.regex.flags}g`
            );
            regex.lastIndex = 0;
            const match = regex.exec(remaining);

            if (match && (earliest === null || match.index < earliest.index)) {
                earliest = { index: match.index, match: match[0], className: pattern.className };
            }
        }

        if (!earliest) {
            tokens.push({ text: remaining });
            break;
        }

        if (earliest.index > 0) {
            tokens.push({ text: remaining.slice(0, earliest.index) });
        }

        tokens.push({ text: earliest.match, className: earliest.className });
        remaining = remaining.slice(earliest.index + earliest.match.length);
    }

    return (
        <>
            {tokens.map((token, index) => (
                <span key={index} className={token.className}>
                    {token.text}
                </span>
            ))}
        </>
    );
}

function HighlightedCode({
    code,
    language,
    showLineNumbers,
}: {
    code: string;
    language: CodeLanguage;
    showLineNumbers: boolean;
}) {
    const lines = code.trim().split('\n');
    const patterns = PATTERNS[language];
    const hideLineNumbers = !showLineNumbers || lines.length === 1;

    return (
        <div className="overflow-x-auto py-4">
            {lines.map((line, index) => (
                <div key={index} className="flex min-h-6 px-4">
                    {!hideLineNumbers && (
                        <span
                            aria-hidden
                            className="w-8 shrink-0 select-none pr-4 text-right text-xs leading-6 text-[#484f58]"
                        >
                            {index + 1}
                        </span>
                    )}
                    <code className="min-w-0 flex-1 whitespace-pre text-[13px] leading-6 text-[#c9d1d9]">
                        <HighlightedLine line={line} patterns={patterns} />
                    </code>
                </div>
            ))}
        </div>
    );
}

export function CodeBlock({
    code,
    language = 'bash',
    title,
    className,
    showLineNumbers = true,
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            className={cn(
                'overflow-hidden rounded-xl border border-border bg-[#0d1117] shadow-sm',
                className
            )}
        >
            <div className="flex items-center justify-between border-b border-[#30363d] bg-[#161b22] px-4 py-2.5">
                <span className="text-xs font-medium text-[#8b949e]">
                    {title ?? LANGUAGE_LABELS[language]}
                </span>
                <button
                    type="button"
                    onClick={handleCopy}
                    className={cn(
                        'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs transition-colors',
                        copied
                            ? 'text-[#3fb950]'
                            : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#c9d1d9]'
                    )}
                    aria-label="Copy code"
                >
                    {copied ? (
                        <>
                            <Check className="h-3.5 w-3.5" />
                            Copied
                        </>
                    ) : (
                        <>
                            <Copy className="h-3.5 w-3.5" />
                            Copy
                        </>
                    )}
                </button>
            </div>

            <HighlightedCode
                code={code}
                language={language}
                showLineNumbers={showLineNumbers}
            />
        </div>
    );
}
