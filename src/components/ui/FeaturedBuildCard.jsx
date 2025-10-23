import React from 'react';
import { Gamepad2, Video, Rocket, TrendingUp } from 'lucide-react';
import gamerImage from '../../assets/photo-1534423861386-85a16f5d13fd.jpeg';
import contentImage from '../../assets/content.jpg';
import streamerImage from '../../assets/streamer.jpg';
import ultimateRigImage from '../../assets/ultimate rig.jpg';

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
        <div style={{animationDelay: `${delay}ms`}} className="group glassmorphic rounded-lg text-left transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-fuchsia-500/20 transition-all duration-300 opacity-0 animate-fadeInUp flex flex-col overflow-hidden border border-gray-800 hover:border-fuchsia-500/50">
            {/* Image Section */}
            <div className="relative h-48 w-full overflow-hidden">
                {build.iconType === 'Gamepad2' ? (
                    <img 
                        src={gamerImage} 
                        alt={build.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg"
                    />
                ) : build.iconType === 'Video' ? (
                    <img 
                        src={contentImage} 
                        alt={build.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg"
                    />
                ) : build.iconType === 'Rocket' ? (
                    <img 
                        src={ultimateRigImage} 
                        alt={build.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg"
                    />
                ) : build.iconType === 'TrendingUp' ? (
                    <img 
                        src={streamerImage} 
                        alt={build.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <IconComponent className={`${build.iconClass} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Content Section */}
            <div className="p-6 flex-grow flex flex-col">
                <div className="flex-grow">
                    <h4 className="font-bold text-xl mb-2">{build.title}</h4>
                    <p className="text-gray-400 text-sm mb-4">{build.description}</p>
                    <div className="text-xs space-y-1 text-gray-300 border-l-2 border-fuchsia-500 pl-3 mb-4">
                        <p><strong>CPU:</strong> {build.buildData.cpu?.name || 'N/A'}</p>
                        <p><strong>Motherboard:</strong> {build.buildData.motherboard?.name || 'N/A'}</p>
                        <p><strong>RAM:</strong> {build.buildData.ram?.name || 'N/A'}</p>
                        <p><strong>Storage:</strong> {build.buildData.storage?.name || 'N/A'}</p>
                        <p><strong>GPU:</strong> {build.buildData.gpu?.name || 'N/A'}</p>
                        <p><strong>PSU:</strong> {build.buildData.psu?.name || 'N/A'}</p>
                        <p><strong>Case:</strong> {build.buildData.case?.name || 'N/A'}</p>
                        <p><strong>Monitor:</strong> {build.buildData.monitor?.name || 'N/A'}</p>
                        <p><strong>Keyboard:</strong> {build.buildData.keyboard?.name || 'N/A'}</p>
                        <p><strong>Mouse:</strong> {build.buildData.mouse?.name || 'N/A'}</p>
                    </div>
                </div>
                <div className="mt-auto">
                    <p className="text-2xl font-bold text-fuchsia-400 mb-4">Rs. {build.price.toLocaleString('en-IN')}</p>
                    <button onClick={handleLoad} className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors text-white font-bold py-2 px-4 rounded-lg">
                        Load Build
                    </button>
                </div>
            </div>
        </div>
    );
}
