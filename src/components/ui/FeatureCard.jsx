import React from 'react';

export function FeatureCard({ icon, title, description, style }) {
    return (
        <div style={style} className="group glassmorphic p-8 rounded-xl text-center transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 opacity-0 animate-fadeInUp border border-gray-800 hover:border-cyan-500/50">
            <div className="inline-block bg-gradient-to-br from-cyan-500/20 to-teal-500/20 p-5 rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/30">
                <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    {icon}
                </div>
            </div>
            <h4 className="font-bold text-xl mb-3 text-white group-hover:text-cyan-300 transition-colors">{title}</h4>
            <p className="text-gray-400 leading-relaxed">{description}</p>
        </div>
    );
}

