import React, { useState } from 'react';
import { Home, Mail, Lock } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, appId } from '../../config/firebase.js';

export function SignUpPage({ onNavigate }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userRef = doc(db, `/artifacts/${appId}/users`, user.uid);
            await setDoc(userRef, {
                email: user.email,
                createdAt: new Date(),
                savedBuilds: []
            });
            onNavigate('landing');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="font-sans flex flex-col min-h-screen">
            <header className="container mx-auto p-4 flex justify-start">
                <button onClick={() => onNavigate('landing')} className="flex items-center text-gray-400 hover:text-cyan-400 transition-colors">
                    <Home className="w-5 h-5 mr-2" />
                    <span>Back to Home</span>
                </button>
            </header>
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="w-full max-w-md opacity-0 animate-fadeInUp">
                    <form onSubmit={handleSignUp} className="glassmorphic rounded-xl p-8 shadow-2xl space-y-6 glowing-border">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400">Create Account</h1>
                            <p className="text-gray-400 mt-2">Join PCDomain and start building.</p>
                        </div>
                        {error && <p className="text-rose-400 text-sm text-center bg-rose-900/20 p-2 rounded-lg">{error}</p>}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-400">Email Address</label>
                            <div className="relative">
                                <Mail className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 pl-10" required />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-400">Password</label>
                            <div className="relative">
                                <Lock className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 pl-10" required />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-400">Confirm Password</label>
                            <div className="relative">
                                <Lock className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 pl-10" required />
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 transition-colors text-white font-bold py-2.5 px-5 rounded-lg text-center">Create Account</button>
                        <p className="text-sm text-center text-gray-400">
                            Already have an account? <button type="button" onClick={() => onNavigate('login')} className="font-medium text-cyan-400 hover:underline">Login here</button>
                        </p>
                    </form>
                </div>
            </main>
        </div>
    );
}

