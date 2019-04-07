const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
    venueId: {
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
    capacity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Venue = mongoose.model('Venue', venueSchema);
module.exports = Venue;