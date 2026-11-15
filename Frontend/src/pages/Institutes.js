import React, { useState, useEffect } from 'react';
import api from '../api/api';

const Institutes = () => {
    const [institutes, setInstitutes] = useState([]);
    const [formData, setFormData] = useState({ name: '', description: '', image: '' });
    const [editingId, setEditingId] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchInstitutes();
    }, []);

    const fetchInstitutes = async () => {
        try {
            const res = await api.get('/api/institutes');
            setInstitutes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/api/institutes/${editingId}`, formData);
            } else {
                await api.post('/api/institutes', formData);
            }
            setFormData({ name: '', description: '', image: '' });
            setEditingId(null);
            fetchInstitutes();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (inst) => {
        setFormData({ name: inst.name, description: inst.description, image: inst.image });
        setEditingId(inst._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this institute?')) {
            try {
                await api.delete(`/api/institutes/${id}`);
                fetchInstitutes();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="container-fluid">
            <h2 className="mb-4 text-primary">Institute Management</h2>
            {user?.role === 'Admin' && (
                <div className="card mb-4 shadow-sm border-0 border-top border-primary border-4">
                    <div className="card-body">
                        <h5 className="card-title text-secondary mb-4">{editingId ? 'Edit Institute' : 'Add New Institute'}</h5>
                        <form onSubmit={handleSubmit} className="row g-3">
                            <div className="col-md-4">
                                <label className="form-label">Institute Name</label>
                                <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Description</label>
                                <input type="text" className="form-control" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Image URL</label>
                                <input type="text" className="form-control" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
                            </div>
                            <div className="col-md-1 d-flex align-items-end">
                                <button type="submit" className="btn btn-primary w-100">{editingId ? 'Update' : 'Add'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className="table-responsive bg-white rounded shadow-sm">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Description</th>
                            {user?.role === 'Admin' && <th className="py-3 px-4 text-center">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {institutes.length > 0 ? institutes.map((inst) => (
                            <tr key={inst._id}>
                                <td className="px-4 fw-bold">{inst.name}</td>
                                <td className="px-4 text-muted">{inst.description}</td>
                                {user?.role === 'Admin' && (
                                    <td className="px-4 text-center">
                                        <button className="btn btn-outline-warning btn-sm me-2" onClick={() => handleEdit(inst)}>Edit</button>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(inst._id)}>Delete</button>
                                    </td>
                                )}
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={user?.role === 'Admin' ? 3 : 2} className="text-center py-5 text-muted">No institutes found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Institutes;
