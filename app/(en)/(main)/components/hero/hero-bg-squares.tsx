export function HeroBgSquares() {
    const squares = [
        { size: 14, top: "12%", left: "28%", opacity: 0.7 },
        { size: 12, top: "18%", left: "45%", opacity: 0.6 },
        { size: 16, top: "22%", left: "60%", opacity: 0.65 },
        { size: 10, top: "8%", left: "70%", opacity: 0.55 },
        { size: 14, top: "30%", left: "52%", opacity: 0.6 },
        { size: 12, top: "35%", left: "75%", opacity: 0.55 },
        { size: 18, top: "42%", left: "68%", opacity: 0.5 },
        { size: 12, top: "15%", left: "82%", opacity: 0.65 },
        { size: 15, top: "50%", left: "88%", opacity: 0.55 },
        { size: 10, top: "55%", left: "44%", opacity: 0.6 },
        { size: 12, top: "60%", left: "78%", opacity: 0.5 },
        { size: 10, top: "25%", left: "35%", opacity: 0.55 },
        { size: 12, top: "68%", left: "55%", opacity: 0.45 },
        { size: 14, top: "72%", left: "90%", opacity: 0.5 },
        { size: 11, top: "38%", left: "93%", opacity: 0.55 },
    ];

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
        >
            {squares.map((sq, i) => (
                <span
                    key={i}
                    className="absolute border border-[rgba(0,115,255,0.6)] shadow-[0_0_12px_rgba(0,115,255,0.25)]"
                    style={{
                        top: sq.top,
                        left: sq.left,
                        width: sq.size,
                        height: sq.size,
                        borderRadius: 3,
                    }}
                />
            ))}
        </div>
    );
}