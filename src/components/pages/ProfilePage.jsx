import React, { useState, useEffect } from 'react';
import { Home, Loader, PackageOpen, Trash2 } from 'lucide-react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, appId } from '../../config/firebase.js';

export function ProfilePage({ onNavigate, currentUser }) {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (currentUser) {
            const fetchUserData = async () => {
                setIsLoading(true);
                const userRef = doc(db, `/artifacts/${appId}/users`, currentUser.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                }
                setIsLoading(false);
            };
            fetchUserData();
        }
    }, [currentUser]);

    const handleLoadBuild = (buildToLoad) => {
        onNavigate('builder', buildToLoad.components);
    };

    const handleDeleteBuild = async (buildToDelete) => {
        if (!window.confirm("Are you sure you want to delete this build? This cannot be undone.")) {
            return;
        }

        const userRef = doc(db, `/artifacts/${appId}/users`, currentUser.uid);
        const updatedBuilds = userData.savedBuilds.filter(build => 
            build.createdAt.seconds !== buildToDelete.createdAt.seconds || 
            build.createdAt.nanoseconds !== buildToDelete.createdAt.nanoseconds
        );
        
        try {
            await updateDoc(userRef, { savedBuilds: updatedBuilds });
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
            <header className="container mx-auto p-4 flex justify-start">
                <button onClick={() => onNavigate('landing')} className="flex items-center text-gray-400 hover:text-cyan-400 transition-colors">
                    <Home className="w-5 h-5 mr-2" />
                    <span>Back to Home</span>
                </button>
            </header>
            <main className="container mx-auto p-4 md:p-8 opacity-0 animate-fadeInUp">
                <div className="text-center mb-12">
                     <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400">
                        My Profile
                    </h1>
                    <p className="text-gray-400 mt-2">Manage your account and saved builds.</p>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                     <div className="glassmorphic rounded-xl p-6 glowing-border">
                        <h2 className="text-xl font-bold text-cyan-300 mb-4">Account Details</h2>
                        <p className="text-gray-300"><strong>Email:</strong> {userData?.email}</p>
                        <p className="text-gray-300"><strong>Member Since:</strong> {userData?.createdAt ? new Date(userData.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}</p>
                    </div>

                    <div className="glassmorphic rounded-xl p-6 glowing-border">
                        <h2 className="text-xl font-bold text-cyan-300 mb-4">My Saved Builds</h2>
                        {userData?.savedBuilds && userData.savedBuilds.length > 0 ? (
                            <div className="space-y-4">
                                {userData.savedBuilds.map((build, index) => (
                                    <div key={index} className="bg-gray-800/60 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <p className="font-bold text-lg">{build.name}</p>
                                            <p className="text-sm text-gray-400">CPU: {build.components.cpu.name}</p>
                                            <p className="text-sm text-gray-400">GPU: {build.components.gpu.name}</p>
                                            <p className="text-cyan-400 font-semibold mt-1">Total: ₹{build.totalPrice.toFixed(2)}</p>
                                        </div>
                                        <div className="flex gap-2 flex-shrink-0">
                                            <button onClick={() => handleLoadBuild(build)} className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center text-sm">
                                                <PackageOpen className="w-4 h-4 mr-2" /> Load
                                            </button>
                                            <button onClick={() => handleDeleteBuild(build)} className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center text-sm">
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
        </div>
    );
}

