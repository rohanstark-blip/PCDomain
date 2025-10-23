import React from 'react';
import { HelpCircle } from 'lucide-react';

export function HowItWorksFAB({ onOpen }) {
    return (
        <button onClick={onOpen} className="fixed bottom-6 right-6 z-20 bg-black hover:bg-gray-800 text-white rounded-full p-3 shadow-lg shadow-gray-900/40 hover:shadow-gray-900/60 transition-all transform hover:scale-110 border border-cyan-400/50">
            <HelpCircle className="w-6 h-6" />
        </button>
    );
}

