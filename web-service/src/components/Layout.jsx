import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
