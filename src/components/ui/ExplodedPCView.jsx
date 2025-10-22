import React from 'react';

export function ExplodedPCView() {
    return (
        <svg viewBox="0 0 300 300">
            <style>{`
                .float-1 { animation: float-1 4s ease-in-out infinite; }
                .float-2 { animation: float-2 5s ease-in-out infinite; }
                .float-3 { animation: float-3 3.5s ease-in-out infinite; }
                .fan { animation: fan-spin 2s linear infinite; transform-origin: center; }
            `}</style>
             <defs>
                <filter id="componentGlow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>

            {/* Motherboard */}
            <rect x="50" y="80" width="200" height="180" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
            <rect x="140" y="100" width="20" height="20" fill="#0f172a" />
            <circle cx="220" cy="230" r="5" fill="#334155" />

            {/* CPU */}
            <g className="float-1" style={{ animationDelay: '0s' }}>
                <rect x="130" y="60" width="40" height="40" rx="3" fill="#334155" filter="url(#componentGlow)" stroke="#67e8f9"/>
            </g>

            {/* RAM */}
            <g className="float-2" style={{ animationDelay: '-1s' }}>
                <rect x="70" y="45" width="15" height="60" rx="2" fill="#166534" filter="url(#componentGlow)" stroke="#4ade80" />
            </g>
             <g className="float-2" style={{ animationDelay: '-1.5s' }}>
                <rect x="90" y="45" width="15" height="60" rx="2" fill="#166534" filter="url(#componentGlow)" stroke="#4ade80" />
            </g>

            {/* GPU */}
             <g className="float-3" style={{ animationDelay: '-0.5s' }}>
                <rect x="120" y="150" width="110" height="30" rx="5" fill="#4a044e" filter="url(#componentGlow)" stroke="#e879f9" />
                <circle cx="140" cy="165" r="8" fill="#1f2937" className="fan" />
                <circle cx="170" cy="165" r="8" fill="#1f2937" className="fan" style={{animationDelay: '-0.3s'}}/>
            </g>
        </svg>
    );
}

