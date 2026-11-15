const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    groupName: { type: String, required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    isPaymentDone: { type: Boolean, default: false },
    isPresent: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);
