const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const offeringTypeSchema = new mongoose.Schema({
    offeringTypeId: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const OfferingType = mongoose.model('OfferingType', offeringTypeSchema);
module.exports = OfferingType;