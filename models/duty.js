const mongoose = require('mongoose');

const dutySchema = new mongoose.Schema({
    dutyId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

const Duty = mongoose.model('Duty', dutySchema);
module.exports = Duty;