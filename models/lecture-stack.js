import mongoose from 'mongoose';
import Discipline from './discipline';
import Module from './module';
import uuidv4 from 'uuid/v4';

const lectureStackSchema = new mongoose.Schema({
    lectureStackId: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4
    },
    disciplineId: {
        type: String,
        required: true,
        ref: 'Discipline'
    },
    modules: {
        type: [String],
        ref: 'Module'
    },
    groups: {
        number: Number,
        size: Number
    }
}, {
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

lectureStackSchema.virtual('discipline', {
    ref: 'Discipline',
    localField: 'disciplineId',
    foreignField: 'disciplineId',
    justOne: true
});

lectureStackSchema.virtual('module', {
    ref: 'Module',
    localField: 'moduleId',
    foreignField: 'moduleId',
    justOne: true
});

const LectureStack = mongoose.model('LectureStack', lectureStackSchema);
export default LectureStack;