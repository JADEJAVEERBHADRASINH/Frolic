const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    participantName: { type: String, required: true },
    enrollmentNumber: { type: String, required: true },
    mobile: { type: String },
    email: { type: String },
    city: { type: String },
    instituteName: { type: String },
    isGroupLeader: { type: Boolean, default: false },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Participant', participantSchema);
