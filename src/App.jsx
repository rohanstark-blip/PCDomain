import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';
import { LandingPage } from './components/pages/LandingPage.jsx';
import { PCBuilder } from './components/pages/PCBuilder.jsx';
import { ProfilePage } from './components/pages/ProfilePage.jsx';
import { SharedBuildPage } from './components/pages/SharedBuildPage.jsx';
import { Layout } from './components/ui/Layout.jsx';
import { api } from './config/api.js';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, [pathname]);

    return null;
}

function App() {
    const [buildToLoad, setBuildToLoad] = useState(null);

    const handleSignOut = async (navigate, signOut) => {
        try {
            await signOut();
            navigate('/');
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<LayoutWrapper onSignOut={handleSignOut}><LandingPage setBuildToLoad={setBuildToLoad} /></LayoutWrapper>} />
                <Route path="/builder" element={<LayoutWrapper onSignOut={handleSignOut}><PCBuilder initialBuild={buildToLoad} setBuildToLoad={setBuildToLoad} /></LayoutWrapper>} />
                <Route path="/profile" element={<LayoutWrapper onSignOut={handleSignOut}><ProfilePage /></LayoutWrapper>} />
                <Route path="/build/:buildId" element={<LayoutWrapper onSignOut={handleSignOut}><SharedBuildPage /></LayoutWrapper>} />
            </Routes>
        </Router>
    );
}

function LayoutWrapper({ children, onSignOut }) {
    const navigate = useNavigate();
    const { user } = useUser();
    const { signOut } = useClerk();

    // Create user in database when they first sign in
    useEffect(() => {
        if (user && user.id) {
            const initializeUser = async () => {
                try {
                    const email = user.emailAddresses?.[0]?.emailAddress || '';
                    await api.createUser(user.id, email);
                } catch (error) {
                    console.error('Error initializing user:', error);
                }
            };
            initializeUser();
        }
    }, [user]);

    return (
        <div className="bg-gray-950 min-h-screen text-white relative">
            <div className="relative z-10">
                <Layout currentUser={user} onSignOut={() => onSignOut(navigate, signOut)}>
                    {children}
                </Layout>
            </div>
        </div>
    );
}

export default App;
