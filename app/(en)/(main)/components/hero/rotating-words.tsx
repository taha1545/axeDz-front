
export function RotatingWords({ words }: { words: string[] }) {

    return (
        <span className="relative inline-block h-[1.2em] overflow-hidden">
            <span className="invisible font-bold">
                {words.reduce((a, b) => (a.length > b.length ? a : b))}
            </span>

            <span className="absolute left-0 top-0 animate-rotateWords">
                {words.map((word) => (
                    <span
                        key={word}
                        className="block h-[1.2em] leading-[1.2em] text-primary font-bold"
                    >
                        {word}
                    </span>
                ))}
            </span>

            {/* animation CSS */}
            <style jsx>{`
        @keyframes rotateWords {
          0% { transform: translateY(0%); }
          20% { transform: translateY(0%); }
          25% { transform: translateY(-100%); }
          45% { transform: translateY(-100%); }
          50% { transform: translateY(-200%); }
          70% { transform: translateY(-200%); }
          75% { transform: translateY(-300%); }
          95% { transform: translateY(-300%); }
          100% { transform: translateY(0%); }
        }

        .animate-rotateWords {
          animation: rotateWords 10s infinite ease-in-out;
        }
      `}</style>
        </span>
    );
}