import React from 'react';

export function FeatureCard({ icon, title, description, style }) {
    return (
        <div style={style} className="glassmorphic p-6 rounded-lg text-center transform hover:-translate-y-2 transition-transform duration-300 opacity-0 animate-fadeInUp glowing-border">
            <div className="inline-block bg-gray-800 p-4 rounded-full mb-4">
                {icon}
            </div>
            <h4 className="font-bold text-xl mb-2">{title}</h4>
            <p className="text-gray-400">{description}</p>
        </div>
    );
}

