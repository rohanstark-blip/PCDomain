import React from 'react';
import { Navbar } from './Navbar';

export function Layout({ children, currentUser, onSignOut }) {
    return (
        <>
            <Navbar currentUser={currentUser} onSignOut={onSignOut} />
            <main>
                {children}
            </main>
            <footer className="border-t border-cyan-400/20 py-8">
                <div className="container mx-auto text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} PCDomain. All Rights Reserved.</p>
                </div>
            </footer>
        </>
    );
}
