export function HeroGridLines() {
    const size = 26;
    const lines = Array.from({ length: size });

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none h-screen w-screen">
            {/* perspective wrapper */}
            <div className="absolute inset-0 grid-3d h-full w-full ">
                {/* vertical lines */}
                {lines.map((_, i) => (
                    <div
                        key={`v-${i}`}
                        className="grid-line-v"
                        style={{
                            left: `${(i / (size - 1)) * 100}%`,
                        }}
                    />
                ))}

                {/* horizontal lines */}
                {lines.map((_, i) => (
                    <div
                        key={`h-${i}`}
                        className="grid-line-h"
                        style={{
                            top: `${(i / (size - 1)) * 100}%`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}