const Department = require('../models/Department');

exports.createDepartment = async (req, res) => {
    try {
        const department = new Department(req.body);
        await department.save();
        res.status(201).json(department);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getDepartments = async (req, res) => {
    try {
        const { instituteId } = req.query;
        const query = instituteId ? { instituteId } : {};
        const departments = await Department.find(query).populate('instituteId');
        res.json(departments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id).populate('instituteId');
        res.json(department);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateDepartment = async (req, res) => {
    try {
        const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(department);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteDepartment = async (req, res) => {
    try {
        await Department.findByIdAndDelete(req.params.id);
        res.json({ message: 'Department deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
