import React from 'react';
import { Star } from 'lucide-react';

export function FeedbackCard({ name, quote, style }) {
    return (
        <div style={style} className="glassmorphic p-6 rounded-lg text-left opacity-0 animate-fadeInUp glowing-border">
            <div className="flex text-amber-400 mb-4">
                <Star /><Star /><Star /><Star /><Star />
            </div>
            <p className="text-gray-300 mb-4">"{quote}"</p>
            <p className="font-bold text-cyan-400">- {name}</p>
        </div>
    );
}

