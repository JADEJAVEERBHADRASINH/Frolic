const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const { departmentId } = req.query;
        const query = departmentId ? { departmentId } : {};
        const events = await Event.find(query).populate('departmentId');
        res.json(events);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('departmentId');
        res.json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
