'use client';

import { useState, useCallback, useMemo } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

type Language = 'node' | 'python';

interface CodeBlockLabels {
    node: string;
    python: string;
    copy: string;
    copied: string;
    copyTitle: string;
}

interface TokenPattern {
    regex: RegExp;
    color: string;
}

interface CodeBlockProps {
    code: string;
    language: Language;
    className?: string;
    filename?: string;
    onLanguageChange?: (lang: Language) => void;
    labels?: CodeBlockLabels;
}

const DEFAULT_LABELS: CodeBlockLabels = {
    node: 'Node.js',
    python: 'Python',
    copy: 'Copy',
    copied: 'Copied!',
    copyTitle: 'Copy code',
};

const PATTERNS: Record<Language, TokenPattern[]> = {
    node: [
        { regex: /(['"`])(?:\\.|(?!\1)[^\\\r\n])*\1/g, color: 'text-[#a5d6ff]' },
        { regex: /\/\/.*/g, color: 'text-[#8b949e]' },
        { regex: /\b(const|let|var|new|require|import|from|return|async|await|function|class|if|else|for|while|try|catch|throw|typeof|instanceof|delete|in|of)\b/g, color: 'text-[#ff7b72]' },
        { regex: /\b(true|false|null|undefined|NaN|Infinity)\b/g, color: 'text-[#79c0ff]' },
        { regex: /\b\d+(?:\.\d+)?\b/g, color: 'text-[#79c0ff]' },
        { regex: /\b(console|process|Buffer|JSON|Math|Date|Promise|Array|Object|String|Number|Boolean)\b/g, color: 'text-[#d2a8ff]' },
        { regex: /[{}[\](),.;:]/g, color: 'text-[#c9d1d9]' },
    ],
    python: [
        { regex: /(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/g, color: 'text-[#a5d6ff]' },
        { regex: /#.*/g, color: 'text-[#8b949e]' },
        { regex: /\b(def|class|import|from|return|if|else|elif|for|while|try|except|with|as|pass|break|continue|lambda|yield|raise|assert|del|global|nonlocal|and|or|not|in|is|None|True|False)\b/g, color: 'text-[#ff7b72]' },
        { regex: /\b\d+(?:\.\d+)?\b/g, color: 'text-[#79c0ff]' },
        { regex: /\b(print|len|range|enumerate|zip|map|filter|sum|min|max|int|str|float|list|dict|tuple|set|open|type|isinstance|hasattr|getattr)\b/g, color: 'text-[#d2a8ff]' },
        { regex: /[{}[\](),.;:]/g, color: 'text-[#c9d1d9]' },
    ],
};

function HighlightedLine({ line, patterns }: { line: string; patterns: TokenPattern[] }) {
    if (!line.trim()) return <br />;

    const tokens: { text: string; color?: string }[] = [];
    let remaining = line;

    while (remaining.length > 0) {
        let earliest: { index: number; match: string; color: string } | null = null;

        for (const p of patterns) {
            const regex = new RegExp(p.regex.source, p.regex.flags.replace('g', '') + 'g');
            const match = regex.exec(remaining);
            if (match && (earliest === null || match.index < earliest.index)) {
                earliest = { index: match.index, match: match[0], color: p.color };
            }
        }

        if (!earliest) {
            tokens.push({ text: remaining });
            break;
        }

        if (earliest.index > 0) {
            tokens.push({ text: remaining.slice(0, earliest.index) });
        }

        tokens.push({ text: earliest.match, color: earliest.color });
        remaining = remaining.slice(earliest.index + earliest.match.length);
    }

    return (
        <>
            {tokens.map((t, i) => (
                <span key={i} className={t.color || ''}>
                    {t.text}
                </span>
            ))}
        </>
    );
}

export function CodeBlock({
    code,
    language,
    className,
    filename,
    onLanguageChange,
    labels = DEFAULT_LABELS,
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const patterns = PATTERNS[language];
    const lines = useMemo(() => code.split('\n'), [code]);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(code);
        } catch {
            const ta = document.createElement('textarea');
            ta.value = code;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [code]);

    const displayFile = filename || (language === 'node' ? 'index.js' : 'main.py');

    return (
        <div className={cn(
            'overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117]',
            className
        )}>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#30363d] bg-[#161b22] px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                        <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                        <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="ml-2 font-mono text-xs text-[#8b949e]">{displayFile}</span>
                </div>

                <div className=" hidden md:flex items-center gap-3">
                    {/* Language Toggle */}
                    {onLanguageChange && (
                        <div className="flex items-center rounded-lg  bg-[#0d1117] p-0.5">
                            <button
                                onClick={() => onLanguageChange('node')}
                                className={cn(
                                    'rounded-md px-3 py-1 text-xs font-medium transition-all',
                                    language === 'node'
                                        ? 'bg-[#238636] text-white'
                                        : 'text-[#8b949e] hover:text-[#c9d1d9]'
                                )}
                            >
                                {labels.node}
                            </button>
                        </div>
                    )}

                    {/* Copy */}
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 text-xs text-[#8b949e] transition-colors hover:text-[#c9d1d9]"
                        title={labels.copyTitle}
                    >
                        {copied ? (
                            <>
                                <Check className="h-3.5 w-3.5" />
                                <span>{labels.copied}</span>
                            </>
                        ) : (
                            <>
                                <Copy className="h-3.5 w-3.5" />
                                <span>{labels.copy}</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Code */}
            <div className="overflow-x-auto p-4">
                <div className="font-mono text-[13px] leading-6">
                    {lines.map((line, i) => (
                        <div key={i} className="flex">
                            <span className="w-10 shrink-0 select-none pr-4 pt-0.5 text-right text-xs text-[#484f58]">
                                {i + 1}
                            </span>
                            <span className="whitespace-pre text-[#c9d1d9]">
                                <HighlightedLine line={line} patterns={patterns} />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}