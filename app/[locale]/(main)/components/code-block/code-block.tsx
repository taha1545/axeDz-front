'use client';

import { cn } from '@/lib/utils';

type Language = 'node' | 'python';

interface CodeBlockProps {
    code: string;
    language: Language;
    className?: string;
}

interface TokenPattern {
    regex: RegExp;
    color: string;
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
    const lines = code.split('\n');

    const patterns: TokenPattern[] =
        language === 'node'
            ? [
                { regex: /\/\/.*/g, color: 'text-[#8b949e]' },
                { regex: /(['"`])(?:\\.|(?!\1)[^\\\r\n])*\1/g, color: 'text-[#a5d6ff]' },
                { regex: /\b(const|let|var|new|require|import|from|return|async|await|function|class|if|else|for|while|try|catch|throw|typeof|instanceof|delete|in|of)\b/g, color: 'text-[#ff7b72]' },
                { regex: /\b(true|false|null|undefined|NaN|Infinity)\b/g, color: 'text-[#79c0ff]' },
                { regex: /\b\d+(?:\.\d+)?\b/g, color: 'text-[#79c0ff]' },
                { regex: /\b(console|process|Buffer|JSON|Math|Date|Promise|Array|Object|String|Number|Boolean)\b/g, color: 'text-[#d2a8ff]' },
                { regex: /[{}[\](),.;:]/g, color: 'text-[#c9d1d9]' },
            ]
            : [
                { regex: /#.*/g, color: 'text-[#8b949e]' },
                { regex: /(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/g, color: 'text-[#a5d6ff]' },
                { regex: /\b(def|class|import|from|return|if|else|elif|for|while|try|except|with|as|pass|break|continue|lambda|yield|raise|assert|del|global|nonlocal|and|or|not|in|is|None|True|False)\b/g, color: 'text-[#ff7b72]' },
                { regex: /\b\d+(?:\.\d+)?\b/g, color: 'text-[#79c0ff]' },
                { regex: /\b(print|len|range|enumerate|zip|map|filter|sum|min|max|int|str|float|list|dict|tuple|set|open|type|isinstance|hasattr|getattr)\b/g, color: 'text-[#d2a8ff]' },
                { regex: /[{}[\](),.;:]/g, color: 'text-[#c9d1d9]' },
            ];

    return (
        <div className={cn('font-mono text-[13px] leading-6 overflow-x-auto', className)}>
            {lines.map((line, i) => (
                <div key={i} className="flex">
                    <span className="text-[#484f58] select-none w-10 text-right pr-4 text-xs pt-0.5 shrink-0">
                        {i + 1}
                    </span>
                    <span className="text-[#c9d1d9] whitespace-pre">
                        <HighlightedLine line={line} patterns={patterns} />
                    </span>
                </div>
            ))}
        </div>
    );
}

function HighlightedLine({ line, patterns }: { line: string; patterns: TokenPattern[] }) {
    if (!line.trim()) return <br />;

    const tokens: { text: string; color?: string }[] = [];
    let remaining = line;

    while (remaining.length > 0) {
        let earliest: { index: number; match: string; color: string } | null = null;

        for (const p of patterns) {
            const regex = new RegExp(p.regex.source, p.regex.flags.replace('g', '') + 'g');
            regex.lastIndex = 0;
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