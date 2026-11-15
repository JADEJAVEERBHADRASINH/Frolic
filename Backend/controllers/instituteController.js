const Institute = require('../models/Institute');

exports.createInstitute = async (req, res) => {
    try {
        const institute = new Institute(req.body);
        await institute.save();
        res.status(201).json(institute);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getInstitutes = async (req, res) => {
    try {
        const institutes = await Institute.find().populate('coordinatorId');
        res.json(institutes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getInstitute = async (req, res) => {
    try {
        const institute = await Institute.findById(req.params.id).populate('coordinatorId');
        res.json(institute);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateInstitute = async (req, res) => {
    try {
        const institute = await Institute.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(institute);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteInstitute = async (req, res) => {
    try {
        await Institute.findByIdAndDelete(req.params.id);
        res.json({ message: 'Institute deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
