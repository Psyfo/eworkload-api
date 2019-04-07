const mongoose = require('mongoose');
const Faculty = require('./faculty');

const departmentSchema = new mongoose.Schema({
    departmentId: {
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
    facultyId: {
        type: String,
        ref: 'Faculty' 
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

// Hooks


// Virtuals
departmentSchema.virtual('faculty', {
    ref: 'Faculty',
    localField: 'facultyId',
    foreignField: 'facultyId',
    justOne: true
});


const Department = mongoose.model('Department', departmentSchema);
module.exports = Department;