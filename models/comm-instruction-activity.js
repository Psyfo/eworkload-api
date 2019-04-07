const mongoose = require('mongoose');
const Activity = require('./activity');
const Evidence = require('./evidence');

const commInstructionActivitySchema = new mongoose.Schema({
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

// Hooks

// Virtuals
commInstructionActivitySchema.virtual('evidence', {
    ref: 'Evidence',
    localField: 'evidenceId',
    foreignField: 'evidenceId',
    justOne: true
});

const CommInstructionActivity = Activity.discriminator('CommInstructionActivity', commInstructionActivitySchema);
module.exports = CommInstructionActivity;