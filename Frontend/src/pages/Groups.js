import React, { useState, useEffect } from 'react';
import api from '../api/api';

const Groups = () => {
    const [groups, setGroups] = useState([]);
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({ groupName: '', eventId: '' });
    const [participants, setParticipants] = useState([]);
    const [newParticipant, setNewParticipant] = useState({
        participantName: '', enrollmentNumber: '', mobile: '', isGroupLeader: false
    });
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchGroups();
        fetchEvents();
    }, []);

    const fetchGroups = async () => {
        try {
            const res = await api.get('/api/groups');
            setGroups(res.data);
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

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/groups', formData);
            setFormData({ groupName: '', eventId: '' });
            fetchGroups();
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to create group');
        }
    };

    const fetchParticipants = async (groupId) => {
        try {
            const res = await api.get(`/api/participants?groupId=${groupId}`);
            setParticipants(res.data);
            setSelectedGroupId(groupId);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddParticipant = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/participants', { ...newParticipant, groupId: selectedGroupId });
            setNewParticipant({ participantName: '', enrollmentNumber: '', mobile: '', isGroupLeader: false });
            fetchParticipants(selectedGroupId);
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to add participant');
        }
    };

    const handleTogglePayment = async (group) => {
        try {
            await api.put(`/api/groups/${group._id}`, { isPaymentDone: !group.isPaymentDone });
            fetchGroups();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container-fluid">
            <h2 className="text-primary mb-4">Group & Participant Management</h2>
            
            <div className="row">
                <div className="col-md-5">
                    <div className="card shadow-sm border-0 border-top border-primary border-4 mb-4">
                        <div className="card-body">
                            <h5 className="card-title text-secondary">Create New Group</h5>
                            <form onSubmit={handleCreateGroup} className="mt-3">
                                <div className="mb-3">
                                    <label className="form-label">Group Name</label>
                                    <input type="text" className="form-control" value={formData.groupName} onChange={(e) => setFormData({ ...formData, groupName: e.target.value })} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Select Event</label>
                                    <select className="form-select" value={formData.eventId} onChange={(e) => setFormData({ ...formData, eventId: e.target.value })} required>
                                        <option value="">Choose Event...</option>
                                        {events.map(ev => <option key={ev._id} value={ev._id}>{ev.name}</option>)}
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary w-100 py-2">Create Group</button>
                            </form>
                        </div>
                    </div>

                    <div className="list-group shadow-sm border-0 rounded">
                        <div className="list-group-item bg-dark text-white fw-bold py-3">Existing Groups</div>
                        {groups.length > 0 ? groups.map(group => (
                            <button 
                                key={group._id} 
                                className={`list-group-item list-group-item-action border-0 py-3 ${selectedGroupId === group._id ? 'bg-primary-subtle border-start border-primary border-4' : ''}`}
                                onClick={() => fetchParticipants(group._id)}
                            >
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                    <span className="fw-bold">{group.groupName}</span>
                                    <span className="badge bg-primary rounded-pill">{group.eventId?.name}</span>
                                </div>
                                <div className="small">
                                    <span className={`badge ${group.isPaymentDone ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                                        Payment: {group.isPaymentDone ? 'Paid' : 'Pending'}
                                    </span>
                                </div>
                            </button>
                        )) : (
                            <div className="list-group-item text-center py-4 text-muted">No groups found</div>
                        )}
                    </div>
                </div>

                <div className="col-md-7">
                    {selectedGroupId ? (
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-header bg-white py-3 border-bottom border-light">
                                <h5 className="m-0 text-primary">Manage Members: {groups.find(g => g._id === selectedGroupId)?.groupName}</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleAddParticipant} className="row g-2 mb-4 p-3 bg-light rounded-3 border">
                                    <div className="col-md-4">
                                        <label className="form-label small">Name</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Full Name" value={newParticipant.participantName} onChange={e => setNewParticipant({...newParticipant, participantName: e.target.value})} required />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label small">Enrollment</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Roll No" value={newParticipant.enrollmentNumber} onChange={e => setNewParticipant({...newParticipant, enrollmentNumber: e.target.value})} required />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label small">Mobile</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Phone" value={newParticipant.mobile} onChange={e => setNewParticipant({...newParticipant, mobile: e.target.value})} />
                                    </div>
                                    <div className="col-12 d-flex justify-content-between align-items-center mt-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" checked={newParticipant.isGroupLeader} onChange={e => setNewParticipant({...newParticipant, isGroupLeader: e.target.checked})} id="isLeader" />
                                            <label className="form-check-label small" htmlFor="isLeader">Designate as Team Leader</label>
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-sm px-4">Add Member</button>
                                    </div>
                                </form>

                                <div className="table-responsive">
                                    <table className="table table-hover align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Member Name</th>
                                                <th>Roll Number</th>
                                                <th className="text-center">Leader</th>
                                                <th className="text-end">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {participants.length > 0 ? participants.map(p => (
                                                <tr key={p._id}>
                                                    <td>{p.participantName}</td>
                                                    <td><code>{p.enrollmentNumber}</code></td>
                                                    <td className="text-center">{p.isGroupLeader ? <span className="badge bg-warning text-dark">LDR</span> : '-'}</td>
                                                    <td className="text-end">
                                                        <button className="btn btn-sm btn-outline-danger border-0" onClick={async () => {
                                                            if(window.confirm('Remove this member?')) {
                                                                await api.delete(`/api/participants/${p._id}`);
                                                                fetchParticipants(selectedGroupId);
                                                            }
                                                        }}>Remove</button>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="4" className="text-center py-4 text-muted small fst-italic">No members in this group yet.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                
                                {(user?.role === 'Admin' || user?.role === 'Coordinator') && (
                                    <div className="mt-4 pt-3 border-top d-flex justify-content-between align-items-center">
                                        <div>
                                            <span className="text-muted small">Status: </span>
                                            <span className={`badge ${groups.find(g => g._id === selectedGroupId)?.isPaymentDone ? 'bg-success' : 'bg-danger'}`}>
                                                {groups.find(g => g._id === selectedGroupId)?.isPaymentDone ? 'Paid' : 'Unpaid'}
                                            </span>
                                        </div>
                                        <button 
                                            className={`btn btn-sm ${groups.find(g => g._id === selectedGroupId)?.isPaymentDone ? 'btn-outline-danger' : 'btn-outline-success'}`}
                                            onClick={() => handleTogglePayment(groups.find(g => g._id === selectedGroupId))}
                                        >
                                            {groups.find(g => g._id === selectedGroupId)?.isPaymentDone ? 'Revert Payment' : 'Confirm Payment'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="h-100 d-flex flex-column justify-content-center align-items-center text-muted bg-white rounded shadow-sm p-5 border border-primary border-opacity-10">
                            <div className="mb-4 opacity-50">👥</div>
                            <h4 className="fw-light">Select a Group</h4>
                            <p className="small text-center px-4">Choose a group from the list on the left to manage members and payment status.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Groups;
