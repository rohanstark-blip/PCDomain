import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader, ArrowLeft, Copy } from 'lucide-react';
import { api } from '../../config/api.js';

export function SharedBuildPage() {
    const { buildId } = useParams();
    const navigate = useNavigate();
    const [build, setBuild] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBuild = async () => {
            try {
                const buildData = await api.getPublicBuild(buildId);
                setBuild(buildData);
            } catch (err) {
                setError('Build not found or no longer available.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBuild();
    }, [buildId]);

    const copyToBuilder = () => {
        navigate('/builder', { state: { initialBuild: build.components } });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <Loader className="w-8 h-8 animate-spin text-cyan-400" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-bold text-rose-400 mb-4">Oops!</h1>
                <p className="text-gray-400 mb-6">{error}</p>
                <button onClick={() => navigate('/')} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg">
                    Go Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
            <div className="container mx-auto max-w-4xl">
                <button onClick={() => navigate('/')} className="flex items-center text-gray-400 hover:text-cyan-400 transition-colors mb-6">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    <span>Back to Home</span>
                </button>

                <div className="glassmorphic rounded-xl p-6 md:p-8 shadow-2xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400">
                                {build.name}
                            </h1>
                            <p className="text-gray-400 mt-2">
                                Created on {new Date(build.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <button onClick={copyToBuilder} className="bg-cyan-500 hover:bg-cyan-600 transition-colors text-white font-bold py-2 px-6 rounded-lg flex items-center">
                            <Copy className="w-4 h-4 mr-2" /> Copy to Builder
                        </button>
                    </div>

                    <div className="space-y-4 mb-8">
                        {Object.entries(build.components).map(([type, component]) => (
                            component && (
                                <div key={type} className="bg-gray-800/50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-xs uppercase text-gray-500 mb-1">{type}</p>
                                            <p className="font-semibold text-white">{component.name}</p>
                                        </div>
                                        <p className="text-cyan-400 font-bold">Rs. {component.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>

                    <div className="border-t border-cyan-400/20 pt-6">
                        <div className="flex justify-between items-center text-2xl font-bold">
                            <span>Total Price:</span>
                            <span className="text-cyan-400">Rs. {build.totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
