import React, { useState, useEffect } from 'react';
import { Loader, PackageOpen, Trash2, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { api } from '../../config/api.js';
import { CheckoutModal } from '../ui/CheckoutModal.jsx';

export function ProfilePage() {
    const navigate = useNavigate();
    const { user: currentUser } = useUser();
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBuild, setSelectedBuild] = useState(null);

    useEffect(() => {
        if (currentUser) {
            const fetchUserData = async () => {
                setIsLoading(true);
                try {
                    const userDoc = await api.getUser(currentUser.id);
                    if (userDoc) {
                        setUserData(userDoc);
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
                setIsLoading(false);
            };
            fetchUserData();
        }
    }, [currentUser]);

    const handleLoadBuild = (buildToLoad) => {
        navigate('/builder', { state: { initialBuild: buildToLoad.components } });
    };

    const handleDeleteBuild = async (buildIndex) => {
        if (!window.confirm("Are you sure you want to delete this build? This cannot be undone.")) {
            return;
        }

        try {
            await api.deleteBuild(currentUser.id, buildIndex);
            const updatedBuilds = userData.savedBuilds.filter((_, i) => i !== buildIndex);
            setUserData(prev => ({ ...prev, savedBuilds: updatedBuilds }));
        } catch (error) {
            console.error("Error deleting build:", error);
            alert("Failed to delete build. Please try again.");
        }
    };
    
    if (isLoading) {
         return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="w-8 h-8 animate-spin text-cyan-400" />
            </div>
        );
    }
    
    return (
        <div className="font-sans min-h-screen">
            <main className="container mx-auto p-4 md:p-8 opacity-0 animate-fadeInUp">
                <div className="text-center mb-12">
                     <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400">
                        My Profile
                    </h1>
                    <p className="text-gray-400 mt-2">Manage your account and saved builds.</p>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                     <div className="glassmorphic rounded-xl p-6">
                        <h2 className="text-xl font-bold text-cyan-300 mb-4">Account Details</h2>
                        <p className="text-gray-300"><strong>Email:</strong> {userData?.email}</p>
                        <p className="text-gray-300"><strong>Member Since:</strong> {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}</p>
                    </div>

                    <div className="glassmorphic rounded-xl p-6">
                        <h2 className="text-xl font-bold text-cyan-300 mb-4">My Saved Builds</h2>
                        {userData?.savedBuilds && userData.savedBuilds.length > 0 ? (
                            <div className="space-y-4">
                                {userData.savedBuilds.map((build, index) => (
                                    <div key={index} className="bg-gray-800/60 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <p className="font-bold text-lg">{build.name}</p>
                                            <p className="text-sm text-gray-400">CPU: {build.components.cpu.name}</p>
                                            <p className="text-sm text-gray-400">GPU: {build.components.gpu.name}</p>
                                            <p className="text-cyan-400 font-semibold mt-1">Total: Rs. {build.totalPrice.toFixed(2)}</p>
                                        </div>
                                        <div className="flex gap-2 flex-shrink-0">
                                            <button onClick={() => setSelectedBuild(build)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center text-sm">
                                                <ShoppingCart className="w-4 h-4 mr-2" /> Buy
                                            </button>
                                            <button onClick={() => handleLoadBuild(build)} className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center text-sm">
                                                <PackageOpen className="w-4 h-4 mr-2" /> Load
                                            </button>
                                            <button onClick={() => handleDeleteBuild(index)} className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center text-sm">
                                                <Trash2 className="w-4 h-4 mr-2" /> Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400">You haven't saved any builds yet. Go to the builder to create one!</p>
                        )}
                    </div>
                </div>
            </main>
            {selectedBuild && (
                <CheckoutModal 
                    build={selectedBuild} 
                    user={currentUser} 
                    onClose={() => setSelectedBuild(null)} 
                />
            )}
        </div>
    );
}

