import React, { useState, useEffect } from 'react';
import api from '../api/api';

const Winners = () => {
    const [winners, setWinners] = useState([]);
    const [events, setEvents] = useState([]);
    const [groups, setGroups] = useState([]);
    const [formData, setFormData] = useState({ eventId: '', groupId: '', position: 1 });
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchWinners();
        fetchEvents();
    }, []);

    const fetchWinners = async () => {
        try {
            const res = await api.get('/api/winners');
            setWinners(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchEvents = async () => {
        try {
            const res = await api.get('/api/events');
            setEvents(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchGroupsForEvent = async (eventId) => {
        if (!eventId) return setGroups([]);
        try {
            const res = await api.get(`/api/groups?eventId=${eventId}`);
            setGroups(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/winners', formData);
            setFormData({ eventId: '', groupId: '', position: 1 });
            fetchWinners();
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to assign winner');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this winner entry?')) {
            try {
                await api.delete(`/api/winners/${id}`);
                fetchWinners();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="container-fluid">
            <h2 className="text-primary mb-4">🏆 Hall of Fame</h2>
            
            {(user?.role === 'Admin' || user?.role === 'Coordinator') && (
                <div className="card shadow-sm border-0 border-top border-warning border-4 mb-4">
                    <div className="card-body">
                        <h5 className="card-title mb-4">Assign Event Winners</h5>
                        <form onSubmit={handleSubmit} className="row g-3">
                            <div className="col-md-4">
                                <label className="form-label">Select Event</label>
                                <select className="form-select" value={formData.eventId} onChange={(e) => { setFormData({ ...formData, eventId: e.target.value }); fetchGroupsForEvent(e.target.value); }} required>
                                    <option value="">Choose...</option>
                                    {events.map(ev => <option key={ev._id} value={ev._id}>{ev.name}</option>)}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Winning Group</label>
                                <select className="form-select" value={formData.groupId} onChange={(e) => setFormData({ ...formData, groupId: e.target.value })} required>
                                    <option value="">Choose...</option>
                                    {groups.map(g => <option key={g._id} value={g._id}>{g.groupName}</option>)}
                                </select>
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">Position</label>
                                <select className="form-select" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} required>
                                    <option value="1">1st (Gold)</option>
                                    <option value="2">2nd (Silver)</option>
                                    <option value="3">3rd (Bronze)</option>
                                </select>
                            </div>
                            <div className="col-md-2 d-flex align-items-end">
                                <button type="submit" className="btn btn-warning w-100 py-2 fw-bold">Assign Winner</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="row">
                {winners.length > 0 ? winners.map(winner => (
                    <div className="col-md-4 mb-4" key={winner._id}>
                        <div className="card h-100 shadow-sm border-0 text-center py-4 px-3 position-relative overflow-hidden">
                            <div className="position-absolute top-0 end-0 p-2">
                                {(user?.role === 'Admin' || user?.role === 'Coordinator') && (
                                    <button className="btn btn-link link-danger p-0" onClick={() => handleDelete(winner._id)}>Remove</button>
                                )}
                            </div>
                            <div className="mb-3">
                                {winner.position === 1 ? (
                                    <span className="fs-1">🥇</span>
                                ) : winner.position === 2 ? (
                                    <span className="fs-1">🥈</span>
                                ) : (
                                    <span className="fs-1">🥉</span>
                                )}
                            </div>
                            <h4 className="text-dark mb-1">{winner.groupId?.groupName}</h4>
                            <p className="text-muted small mb-3">{winner.eventId?.name}</p>
                            <div className={`badge rounded-pill px-4 py-2 ${winner.position === 1 ? 'bg-warning text-dark' : winner.position === 2 ? 'bg-light text-secondary border' : 'bg-info-subtle text-info border border-info'}`}>
                                {winner.position === 1 ? 'CHAMPION' : winner.position === 2 ? 'RUNNER UP' : '2ND RUNNER UP'}
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-12 text-center py-5">
                        <div className="display-1 opacity-25 mb-4">🏆</div>
                        <h4 className="text-muted fw-light">No winners assigned yet.</h4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Winners;
