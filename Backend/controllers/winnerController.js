const Winner = require('../models/Winner');

exports.assignWinner = async (req, res) => {
    try {
        const { eventId, groupId, position } = req.body;
        
        // Validation for duplicate position is handled by mongoose unique index
        const winner = new Winner({ eventId, groupId, position });
        await winner.save();
        res.status(201).json(winner);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'This winner position is already assigned for this event' });
        }
        res.status(400).json({ error: error.message });
    }
};

exports.getWinners = async (req, res) => {
    try {
        const { eventId } = req.query;
        const query = eventId ? { eventId } : {};
        const winners = await Winner.find(query).populate('eventId').populate('groupId');
        res.json(winners);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteWinner = async (req, res) => {
    try {
        await Winner.findByIdAndDelete(req.params.id);
        res.json({ message: 'Winner entry deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
