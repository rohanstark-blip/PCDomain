import React from 'react';
import { Thermometer } from 'lucide-react';

export function ComponentSpotlight() {
    return (
        <div className="lg:col-span-2 glassmorphic p-6 rounded-lg glowing-border">
            <h4 className="text-2xl font-bold mb-2">Component Spotlight</h4>
            <p className="text-gray-400 mb-6">Today's hottest hardware.</p>
            <div className="bg-gray-800/50 rounded-lg p-4 flex items-center gap-4">
                <div className="bg-gray-900 p-3 rounded-lg">
                     <Thermometer className="w-8 h-8 text-amber-400" />
                </div>
                <div>
                    <h5 className="font-bold">NVIDIA GeForce RTX 5060</h5>
                    <p className="text-sm text-gray-400">The new king of mainstream gaming, offering incredible performance and efficiency for 1440p gameplay.</p>
                </div>
            </div>
        </div>
    );
}

