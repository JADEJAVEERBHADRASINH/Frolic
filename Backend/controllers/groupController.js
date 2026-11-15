const Group = require('../models/Group');

exports.createGroup = async (req, res) => {
    try {
        const group = new Group(req.body);
        await group.save();
        res.status(201).json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getGroups = async (req, res) => {
    try {
        const { eventId } = req.query;
        const query = eventId ? { eventId } : {};
        const groups = await Group.find(query).populate('eventId');
        res.json(groups);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getGroup = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id).populate('eventId');
        res.json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateGroup = async (req, res) => {
    try {
        const group = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteGroup = async (req, res) => {
    try {
        await Group.findByIdAndDelete(req.params.id);
        res.json({ message: 'Group deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
