export function EmailIllustration() {
    return (
        <svg
            viewBox="0 0 220 170"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full pointer-events-none"
        >
            <g opacity="0.18">
                <rect x="20" y="45" width="130" height="90" rx="10" fill="#3B82F6" stroke="#3B82F6" strokeWidth="1.5" />
                <path d="M20 58 L85 100 L150 58" stroke="white" strokeWidth="2.5" fill="none" />

                <rect x="80" y="12" width="110" height="75" rx="10" fill="#3B82F6" stroke="#3B82F6" strokeWidth="1.5" transform="rotate(-10 135 50)" />
                <path d="M80 25 L135 58 L190 25" stroke="white" strokeWidth="2" fill="none" transform="rotate(-10 135 50)" />

                <rect x="0" y="100" width="80" height="55" rx="8" fill="#3B82F6" stroke="#3B82F6" strokeWidth="1.5" transform="rotate(8 40 127)" />
                <path d="M0 112 L40 135 L80 112" stroke="white" strokeWidth="2" fill="none" transform="rotate(8 40 127)" />

                <circle cx="195" cy="130" r="7" fill="#3B82F6" />
                <circle cx="208" cy="108" r="4" fill="#3B82F6" />
                <circle cx="10" cy="30" r="4" fill="#3B82F6" />
            </g>
        </svg>
    );
}
