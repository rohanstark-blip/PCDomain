import React from 'react';
import { Gamepad2, Video, Rocket, TrendingUp } from 'lucide-react';
import gamerImage from '../../assets/photo-1534423861386-85a16f5d13fd.jpeg';

const iconMap = {
    Gamepad2,
    Video,
    Rocket,
    TrendingUp
};

export function FeaturedBuildCard({ build, onNavigate, delay }) {
    const handleLoad = () => {
        if(window.confirm(`This will replace your current build. Are you sure you want to load the "${build.title}"?`)) {
            onNavigate('builder', build.buildData);
        }
    };
    
    const IconComponent = iconMap[build.iconType];
    
    return (
        <div style={{animationDelay: `${delay}ms`}} className="glassmorphic rounded-lg text-left transform hover:-translate-y-2 transition-transform duration-300 opacity-0 animate-fadeInUp flex flex-col glowing-border overflow-hidden">
            {/* Image Section */}
            <div className="relative h-48 w-full">
                {build.iconType === 'Gamepad2' ? (
                    <img 
                        src={gamerImage} 
                        alt={build.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <IconComponent className={build.iconClass} />
                    </div>
                )}
            </div>
            
            {/* Content Section */}
            <div className="p-6 flex-grow flex flex-col">
                <div className="flex-grow">
                    <h4 className="font-bold text-xl mb-2">{build.title}</h4>
                    <p className="text-gray-400 text-sm mb-4">{build.description}</p>
                    <div className="text-xs space-y-1 text-gray-300 border-l-2 border-fuchsia-500 pl-3 mb-4">
                        <p><strong>CPU:</strong> {build.keyComponents.cpu}</p>
                        <p><strong>GPU:</strong> {build.keyComponents.gpu}</p>
                    </div>
                </div>
                <div className="mt-auto">
                    <p className="text-2xl font-bold text-fuchsia-400 mb-4">≈ ₹{build.price.toLocaleString('en-IN')}</p>
                    <button onClick={handleLoad} className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors text-white font-bold py-2 px-4 rounded-lg">
                        Load Build
                    </button>
                </div>
            </div>
        </div>
    );
}
