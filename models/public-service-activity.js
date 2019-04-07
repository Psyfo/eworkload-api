const mongoose = require('mongoose');
const Activity = require('./activity');
const Evident = require('./evidence');

const publicServiceActivitySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    evidenceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Evidence'
    }
});

// Virtuals
publicServiceActivitySchema.virtual('evidence', {
    ref: 'Evidence',
    localField: 'evidenceId',
    foreignField: 'evidenceId',
    justOne: true
});

const PublicServiceActivity = Activity.discriminator('PublicServiceActivity', publicServiceActivitySchema);
module.exports = PublicServiceActivity;