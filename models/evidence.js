const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const evidenceSchema = new mongoose.Schema({
    evidenceId: {
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
    item: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const Evidence = mongoose.model('Evidence', evidenceSchema);
module.exports = Evidence;