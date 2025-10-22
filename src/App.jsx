import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { signInAnonymously, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './config/firebase.js';
import { LandingPage } from './components/pages/LandingPage.jsx';
import { PCBuilder } from './components/pages/PCBuilder.jsx';
import { LoginPage } from './components/pages/LoginPage.jsx';
import { SignUpPage } from './components/pages/SignUpPage.jsx';
import { ProfilePage } from './components/pages/ProfilePage.jsx';
import { Layout } from './components/ui/Layout.jsx';

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [authReady, setAuthReady] = useState(false);
    const [buildToLoad, setBuildToLoad] = useState(null);

    useEffect(() => {
        const authAndListen = async () => {
            try {
                await signInAnonymously(auth);
            } catch (error) {
                console.error("Authentication error:", error);
            }
            
            const unsubscribe = onAuthStateChanged(auth, user => {
                setCurrentUser(user);
                setAuthReady(true);
            });
            return () => unsubscribe();
        };

        authAndListen();
    }, []);

    const handleSignOut = async (navigate) => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    if (!authReady) {
        return null;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LayoutWrapper currentUser={currentUser} onSignOut={handleSignOut}><LandingPage setBuildToLoad={setBuildToLoad} /></LayoutWrapper>} />
                <Route path="/builder" element={<LayoutWrapper currentUser={currentUser} onSignOut={handleSignOut}><PCBuilder initialBuild={buildToLoad} setBuildToLoad={setBuildToLoad} /></LayoutWrapper>} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage currentUser={currentUser} />} />
            </Routes>
        </Router>
    );
}

function LayoutWrapper({ children, currentUser, onSignOut }) {
    const navigate = useNavigate();
    return (
        <div className="bg-gray-950 min-h-screen text-white relative">
            <div className="relative z-10">
                <Layout currentUser={currentUser} onSignOut={() => onSignOut(navigate)}>
                    {children}
                </Layout>
            </div>
        </div>
    );
}

export default App;
