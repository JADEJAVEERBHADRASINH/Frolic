const Participant = require('../models/Participant');
const Group = require('../models/Group');
const Event = require('../models/Event');

exports.addParticipant = async (req, res) => {
    try {
        const { groupId, isGroupLeader } = req.body;
        const group = await Group.findById(groupId).populate('eventId');
        if (!group) return res.status(404).json({ error: 'Group not found' });

        const event = group.eventId;
        const participantCount = await Participant.countDocuments({ groupId });

        if (participantCount >= event.maxParticipants) {
            return res.status(400).json({ error: 'Max participants reached for this group' });
        }

        if (isGroupLeader) {
            const leaderExists = await Participant.findOne({ groupId, isGroupLeader: true });
            if (leaderExists) {
                return res.status(400).json({ error: 'Group leader already exists' });
            }
        }

        const participant = new Participant(req.body);
        await participant.save();
        res.status(201).json(participant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getParticipants = async (req, res) => {
    try {
        const { groupId } = req.query;
        const query = groupId ? { groupId } : {};
        const participants = await Participant.find(query).populate('groupId');
        res.json(participants);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteParticipant = async (req, res) => {
    try {
        await Participant.findByIdAndDelete(req.params.id);
        res.json({ message: 'Participant deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
