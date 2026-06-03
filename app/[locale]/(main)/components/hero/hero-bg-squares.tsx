export function HeroBgSquares() {
    const squares = [
        { size: 12, top: "68%", left: "55%", opacity: 0.45 },
        { size: 16, top: "50%", left: "50%", opacity: 0.65 },

        { size: 12, top: "60%", left: "78%", opacity: 0.5 },
        { size: 12, top: "30%", left: "80%", opacity: 0.55 },
        { size: 18, top: "14%", left: "62%", opacity: 0.5 },
        { size: 12, top: "18%", left: "73%", opacity: 0.65 },
        { size: 15, top: "22%", left: "91%", opacity: 0.55 },

        { size: 14, top: "72%", left: "90%", opacity: 0.5 },
        { size: 11, top: "38%", left: "93%", opacity: 0.55 },
        { size: 11, top: "38%", left: "84%", opacity: 0.55 },
    ];

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
        >
            {squares.map((sq, i) => (
                <span
                    key={i}
                    className="absolute border bg-accent  border-[rgba(0,115,255,0.6)] shadow-[0_0_14px_rgba(0,115,255,0.25)] "
                    style={{
                        top: sq.top,
                        left: sq.left,
                        width: sq.size,
                        height: sq.size,
                        borderRadius: "50%",
                        opacity: sq.opacity,
                    }}
                />
            ))}
        </div>
    );
}