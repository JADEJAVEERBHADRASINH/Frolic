import React, { useState, useEffect } from 'react';
import api from '../api/api';

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [institutes, setInstitutes] = useState([]);
    const [formData, setFormData] = useState({ name: '', description: '', instituteId: '' });
    const [editingId, setEditingId] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchDepartments();
        fetchInstitutes();
    }, []);

    const fetchDepartments = async () => {
        try {
            const res = await api.get('/api/departments');
            setDepartments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

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
                await api.put(`/api/departments/${editingId}`, formData);
            } else {
                await api.post('/api/departments', formData);
            }
            setFormData({ name: '', description: '', instituteId: '' });
            setEditingId(null);
            fetchDepartments();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (dept) => {
        setFormData({ name: dept.name, description: dept.description, instituteId: dept.instituteId?._id || '' });
        setEditingId(dept._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this department?')) {
            try {
                await api.delete(`/api/departments/${id}`);
                fetchDepartments();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="container-fluid">
            <h2 className="mb-4 text-primary">Department Management</h2>
            {(user?.role === 'Admin' || user?.role === 'Coordinator') && (
                <div className="card mb-4 shadow-sm border-0 border-top border-primary border-4">
                    <div className="card-body">
                        <h5 className="card-title text-secondary mb-4">{editingId ? 'Edit Department' : 'Add New Department'}</h5>
                        <form onSubmit={handleSubmit} className="row g-3">
                            <div className="col-md-3">
                                <label className="form-label">Department Name</label>
                                <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Description</label>
                                <input type="text" className="form-control" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Associated Institute</label>
                                <select className="form-select" value={formData.instituteId} onChange={(e) => setFormData({ ...formData, instituteId: e.target.value })} required>
                                    <option value="">Select Institute</option>
                                    {institutes.map((inst) => <option key={inst._id} value={inst._id}>{inst.name}</option>)}
                                </select>
                            </div>
                            <div className="col-md-2 d-flex align-items-end">
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
                            <th className="py-3 px-4">Institute</th>
                            {(user?.role === 'Admin' || user?.role === 'Coordinator') && <th className="py-3 px-4 text-center">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {departments.length > 0 ? departments.map((dept) => (
                            <tr key={dept._id}>
                                <td className="px-4 fw-bold">{dept.name}</td>
                                <td className="px-4 text-muted">{dept.description}</td>
                                <td className="px-4"><span className="badge bg-light text-dark border">{dept.instituteId?.name}</span></td>
                                {(user?.role === 'Admin' || user?.role === 'Coordinator') && (
                                    <td className="px-4 text-center">
                                        <button className="btn btn-outline-warning btn-sm me-2" onClick={() => handleEdit(dept)}>Edit</button>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(dept._id)}>Delete</button>
                                    </td>
                                )}
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={user?.role === 'Admin' || user?.role === 'Coordinator' ? 4 : 3} className="text-center py-5 text-muted">No departments found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Departments;
