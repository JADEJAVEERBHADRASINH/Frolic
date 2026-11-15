import React from 'react';

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="card shadow-sm mt-3">
            <div className="card-body">
                <h2 className="card-title text-primary">Dashboard Overview</h2>
                <hr />
                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="card bg-primary text-white mb-3 shadow border-0">
                            <div className="card-body text-center py-4">
                                <h5 className="card-title mb-3">User Profile</h5>
                                <p className="card-text fs-4 mb-0">{user?.name}</p>
                                <small className="text-light">{user?.email}</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card bg-success text-white mb-3 shadow border-0">
                            <div className="card-body text-center py-4">
                                <h5 className="card-title mb-3">System Role</h5>
                                <p className="card-text fs-4 mb-0">{user?.role}</p>
                                <small className="text-light">Access level: {user?.role}</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <h4>Quick Links</h4>
                    <div className="list-group mt-3 shadow-sm">
                        <a href="/groups" className="list-group-item list-group-item-action">Manage Your Groups</a>
                        {user?.role !== 'Student' && (
                            <a href="/events" className="list-group-item list-group-item-action">View & Manage Events</a>
                        )}
                        <a href="/winners" className="list-group-item list-group-item-action">View Event Winners</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
