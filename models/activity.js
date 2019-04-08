import mongoose from 'mongoose'
import uuidv4 from 'uuid/v4'

const activitySchema = new mongoose.Schema({
    activityId: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4
    },
    userId: {
        type: String,
        ref: 'User'
    },
    dutyId: {
        type: String,
        ref: 'Duty'
    },
    approvalStatus: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    discriminatorKey: 'activityType',
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

// Hooks


// Virtuals
activitySchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: 'user',
    justOne: true
});

activitySchema.virtual('duty', {
    ref: 'Duty',
    localField: 'dutyId',
    foreignField: 'dutyId',
    justOne: true
});

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;