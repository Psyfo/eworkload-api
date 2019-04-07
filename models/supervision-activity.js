const mongoose = require('mongoose');
const Activity = require('./activity');
const Student = require('./student');

const supervisionActivitySchema = new mongoose.Schema({
    supervisionRole: {
        type: String,
        required: true,
        trim: true
    },
    studentId: {
        type: String,
        ref: 'Student'
    }
});

// Virtuals
supervisionActivitySchema.virtual('student', {
    ref: 'Student',
    localField: 'studentId',
    foreignField: 'studentId',
    justOne: true
});

const SupervisionActivity = Activity.discriminator('SupervisionActivity', supervisionActivitySchema);
module.exports = SupervisionActivity;