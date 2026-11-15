const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tagline: { type: String },
    description: { type: String },
    fees: { type: Number, required: true },
    prizes: {
        first: { type: String },
        second: { type: String },
        third: { type: String }
    },
    location: { type: String, required: true },
    minParticipants: { type: Number, required: true },
    maxParticipants: { type: Number, required: true },
    maxGroupsAllowed: { type: Number },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
