const mongoose = require('mongoose');
const validate = require('validator');

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        default: Date.now
    }
}, {
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;