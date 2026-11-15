import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    const token = localStorage.getItem('token');

    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh', width: '100vw' }}>
            <Navbar />
            <div className="d-flex flex-grow-1 overflow-hidden">
                {token && <Sidebar />}
                <main className="flex-grow-1 p-4 overflow-auto">
                    <div className="container-fluid">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;