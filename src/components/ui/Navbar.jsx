import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, LogOut } from 'lucide-react';
import { useClerk } from '@clerk/clerk-react';

export function Navbar({ currentUser, onSignOut }) {
    const { openSignIn, openSignUp } = useClerk();
    return (
        <header className="sticky top-0 bg-gray-950/70 backdrop-blur-lg z-20 border-b border-cyan-400/20">
            <nav className="container mx-auto flex justify-between items-center p-4 relative">
                <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400">PCDomain</Link>
                <div className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
                    <a href="/#features" className="hover:text-cyan-400 transition-colors">Features</a>
                    <a href="/#featured-builds" className="hover:text-cyan-400 transition-colors">Builds</a>
                    <a href="/#faq" className="hover:text-cyan-400 transition-colors">FAQs</a>
                    <a href="/#feedback" className="hover:text-cyan-400 transition-colors">Feedbacks</a>
                </div>
                <div className="flex items-center space-x-2">
                    {currentUser && !currentUser.isAnonymous ? (
                        <>
                            <Link to="/profile" className="bg-gray-800 hover:bg-gray-700 transition-colors px-4 py-2 rounded-lg text-sm font-medium flex items-center">
                                <UserCircle className="w-4 h-4 mr-2" /> My Profile
                            </Link>
                            <button onClick={onSignOut} className="bg-rose-600 hover:bg-rose-700 transition-colors px-4 py-2 rounded-lg text-sm font-medium flex items-center">
                                <LogOut className="w-4 h-4 mr-2" /> Logout
                            </button>
                        </>
                    ) : (
                        <button onClick={() => openSignIn()} className="bg-cyan-500 hover:bg-cyan-600 transition-colors text-white px-4 py-2 rounded-lg text-sm font-medium">
                            Get Started
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
}
