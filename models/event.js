const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;