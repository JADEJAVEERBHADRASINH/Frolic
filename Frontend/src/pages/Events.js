import React, { useState, useEffect } from 'react';
import api from '../api/api';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        name: '', description: '', tagline: '', fees: 0, location: '',
        minParticipants: 1, maxParticipants: 5, departmentId: ''
    });
    const [editingId, setEditingId] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchEvents();
        fetchDepartments();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await api.get('/api/events');
            setEvents(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchDepartments = async () => {
        try {
            const res = await api.get('/api/departments');
            setDepartments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/api/events/${editingId}`, formData);
            } else {
                await api.post('/api/events', formData);
            }
            setFormData({ name: '', description: '', tagline: '', fees: 0, location: '', minParticipants: 1, maxParticipants: 5, departmentId: '' });
            setEditingId(null);
            fetchEvents();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (event) => {
        setFormData({
            name: event.name, description: event.description, tagline: event.tagline,
            fees: event.fees, location: event.location,
            minParticipants: event.minParticipants, maxParticipants: event.maxParticipants,
            departmentId: event.departmentId?._id || ''
        });
        setEditingId(event._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await api.delete(`/api/events/${id}`);
                fetchEvents();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary m-0">Event Management</h2>
                <div className="badge bg-primary fs-6 py-2 px-3">{events.length} Events Total</div>
            </div>
            
            {(user?.role === 'Admin' || user?.role === 'Coordinator') && (
                <div className="card mb-4 shadow-sm border-0 border-top border-primary border-4">
                    <div className="card-body">
                        <h5 className="card-title text-secondary mb-4">{editingId ? 'Edit Event' : 'Add New Event'}</h5>
                        <form onSubmit={handleSubmit} className="row g-3">
                            <div className="col-md-4">
                                <label className="form-label">Event Name</label>
                                <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Tagline</label>
                                <input type="text" className="form-control" value={formData.tagline} onChange={(e) => setFormData({ ...formData, tagline: e.target.value })} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Fees (₹)</label>
                                <input type="number" className="form-control" value={formData.fees} onChange={(e) => setFormData({ ...formData, fees: e.target.value })} required />
                            </div>
                            <div className="col-md-8">
                                <label className="form-label">Description</label>
                                <textarea className="form-control" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="2"></textarea>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Location</label>
                                <input type="text" className="form-control" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Min Participants</label>
                                <input type="number" className="form-control" value={formData.minParticipants} onChange={(e) => setFormData({ ...formData, minParticipants: e.target.value })} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Max Participants</label>
                                <input type="number" className="form-control" value={formData.maxParticipants} onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Department</label>
                                <select className="form-select" value={formData.departmentId} onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })} required>
                                    <option value="">Select Department</option>
                                    {departments.map((dept) => <option key={dept._id} value={dept._id}>{dept.name}</option>)}
                                </select>
                            </div>
                            <div className="col-md-2 d-flex align-items-end">
                                <button type="submit" className="btn btn-primary w-100 py-2">{editingId ? 'Update Event' : 'Create Event'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            <div className="row">
                {events.length > 0 ? events.map((event) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={event._id}>
                        <div className="card h-100 shadow-sm border-0 border-start border-primary border-4 hover-shadow transition">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <h5 className="card-title text-primary m-0">{event.name}</h5>
                                    <span className="badge bg-success">₹{event.fees}</span>
                                </div>
                                <h6 className="card-subtitle mb-3 text-muted fst-italic">{event.tagline}</h6>
                                <p className="card-text text-secondary small" style={{ minHeight: '3rem' }}>{event.description}</p>
                                
                                <div className="mt-auto pt-3 border-top">
                                    <div className="row g-2">
                                        <div className="col-6">
                                            <small className="text-muted d-block small">Department</small>
                                            <span className="small fw-bold">{event.departmentId?.name}</span>
                                        </div>
                                        <div className="col-6">
                                            <small className="text-muted d-block small">Location</small>
                                            <span className="small fw-bold">{event.location}</span>
                                        </div>
                                        <div className="col-12 mt-2">
                                            <span className="badge bg-light text-primary border border-primary w-100 py-2">
                                                Group Size: {event.minParticipants} - {event.maxParticipants} Participants
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {(user?.role === 'Admin' || user?.role === 'Coordinator') && (
                                <div className="card-footer bg-light border-0 d-flex gap-2">
                                    <button className="btn btn-outline-warning btn-sm flex-grow-1" onClick={() => handleEdit(event)}>Edit</button>
                                    <button className="btn btn-outline-danger btn-sm flex-grow-1" onClick={() => handleDelete(event._id)}>Delete</button>
                                </div>
                            )}
                        </div>
                    </div>
                )) : (
                    <div className="col-12 text-center py-5">
                        <div className="text-muted fs-4">No events found. Start by creating one!</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;
