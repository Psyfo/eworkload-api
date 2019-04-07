const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const disciplineSchema = new mongoose.Schema({
    disciplineId: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

const Discipline = mongoose.model('Discipline', disciplineSchema);
module.exports = Discipline;