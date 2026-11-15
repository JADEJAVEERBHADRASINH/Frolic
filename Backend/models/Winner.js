const mongoose = require('mongoose');

const winnerSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    position: { type: Number, enum: [1, 2, 3], required: true }
}, { timestamps: true });

// Ensure unique winner position per event
winnerSchema.index({ eventId: 1, position: 1 }, { unique: true });

module.exports = mongoose.model('Winner', winnerSchema);
