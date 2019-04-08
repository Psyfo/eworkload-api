import mongoose from 'mongoose'
import Activity from './activity'
import LectureStack from './lecture-stack'

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
export default LectureActivity;