import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) return null;

    return (
        <div className="bg-light border-end vh-100" style={{ width: '250px' }}>
            <div className="p-3">
                <h5 className="text-primary">{user?.role} Menu</h5>
                <hr />
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link text-dark" to="/">Dashboard</Link>
                    </li>
                    {user?.role === 'Admin' && (
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="/institutes">Institutes</Link>
                        </li>
                    )}
                    {(user?.role === 'Admin' || user?.role === 'Coordinator') && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/departments">Departments</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/events">Events</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/winners">Winners</Link>
                            </li>
                        </>
                    )}
                    <li className="nav-item">
                        <Link className="nav-link text-dark" to="/groups">Group Management</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
