const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const positionSchema = new mongoose.Schema({
    positionId: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4
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

const Position = mongoose.model('Position', positionSchema);
module.exports = Position;