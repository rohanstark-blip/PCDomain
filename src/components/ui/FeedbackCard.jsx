import React from 'react';
import { Star } from 'lucide-react';

export function FeedbackCard({ name, quote, rating = 5, style }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
        <div style={style} className="group glassmorphic p-6 rounded-lg text-left transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 opacity-0 animate-fadeInUp border border-gray-800 hover:border-cyan-500/50">
            <div className="flex text-amber-400 mb-4 group-hover:text-amber-300 transition-colors">
                {[...Array(fullStars)].map((_, i) => (
                    <Star key={i} fill="currentColor" className="w-5 h-5" />
                ))}
                {hasHalfStar && (
                    <div className="relative w-5 h-5">
                        <Star className="w-5 h-5 text-gray-600" fill="currentColor" />
                        <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                            <Star className="w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors" fill="currentColor" />
                        </div>
                    </div>
                )}
                {[...Array(5 - Math.ceil(rating))].map((_, i) => (
                    <Star key={`empty-${i}`} className="w-5 h-5 text-gray-600" fill="currentColor" />
                ))}
            </div>
            <p className="text-gray-300 mb-4">"{quote}"</p>
            <p className="font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">- {name}</p>
        </div>
    );
}

