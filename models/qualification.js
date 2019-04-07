const mongoose = require('mongoose');
const Department = require('./department');

const qualificationSchema = new mongoose.Schema({
    qualificationId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    saqaId: {
        type: String,
        trim: true
    },
    departmentId: {
        type: String,
        trim: true,
        ref: 'Department'
    },
    heqsfLevel: {
        type: String,
        trim: true
    },
    purpose: {
        type: String,
        trim: true
    },
    exitLevelOutcomes: {
        type: [String]
    },
    graduateAttributes: {
        type: [String]
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

// Virtuals
qualificationSchema.virtual('department', {
    ref: 'Department',
    localField: 'departmentId',
    foreignField: 'departmentId',
    justOne: true
});

const Qualification = mongoose.model('Qualification', qualificationSchema);
module.exports = Qualification;