const mongoose = require('mongoose');
const Activity = require('./activity');
const LectureStack = require('./lecture-stack');

const lectureActivitySchema = new mongoose.Schema({
    lectureStackId: {
        type: String,
        ref: 'LectureStack'
    }
});

// Virtuals
lectureActivitySchema.virtual('lecture-stack', {
    ref: 'LectureStack',
    localField: 'lectureStackId',
    foreignField: 'LectureStackId',
    justOne: true
});

const LectureActivity = Activity.discriminator('LectureActivity', lectureActivitySchema);
module.exports = LectureActivity;