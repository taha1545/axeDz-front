"use client";

export function RotatingWords({ words }: { words: string[] }) {
    const total = words.length;

    return (
        <span
            className="relative inline-block overflow-hidden align-bottom"
            style={{ height: "1.2em" }}
        >
            {/* invisible longest word to keep width stable */}
            <span className="invisible font-bold">
                {words.reduce((a, b) => (a.length > b.length ? a : b))}
            </span>

            {/* animated words */}
            <span
                className="absolute left-0 top-0 flex flex-col"
                style={{
                    animation: `rotateWords ${total * 2}s infinite`,
                }}
            >
                {[...words, words[0]].map((word, index) => (
                    <span
                        key={index}
                        className="h-[1.2em] leading-[1.2em] font-bold text-primary"
                    >
                        {word}
                    </span>
                ))}
            </span>

            <style jsx>{`
                @keyframes rotateWords {
                    0% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(-${total * 1.2}em);
                    }
                }
            `}</style>
        </span>
    );
}