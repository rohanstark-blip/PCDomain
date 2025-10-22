import React from 'react';
import { PackageOpen, CheckCircle, Gauge } from 'lucide-react';

export function HowItWorksModal({ onClose }) {
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeInUp" style={{ animationDuration: '0.3s' }}>
            <div className="glassmorphic rounded-xl p-8 shadow-2xl w-full max-w-2xl m-4 relative glowing-border">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">&times;</button>
                <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="space-y-2">
                        <div className="inline-block bg-gray-800 p-4 rounded-full text-cyan-400">
                            <PackageOpen className="w-10 h-10" />
                        </div>
                        <h3 className="font-bold">1. Select Your Parts</h3>
                        <p className="text-sm text-gray-400">Choose components from our vast library or let our AI suggest a build for your budget and needs.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="inline-block bg-gray-800 p-4 rounded-full text-emerald-400">
                            <CheckCircle className="w-10 h-10" />
                        </div>
                        <h3 className="font-bold">2. Instant AI Check</h3>
                        <p className="text-sm text-gray-400">Our system automatically verifies part compatibility, saving you from costly mistakes.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="inline-block bg-gray-800 p-4 rounded-full text-amber-400">
                            <Gauge className="w-10 h-10" />
                        </div>
                        <h3 className="font-bold">3. Analyze & Save</h3>
                        <p className="text-sm text-gray-400">Get an AI-powered performance analysis and save the build to your profile for later.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

