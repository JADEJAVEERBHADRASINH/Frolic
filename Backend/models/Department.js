const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    instituteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);
