const mongoose = require('mongoose');
const Block = require('./block');
const Module = require('./module');

const moduleBlockSchema = new mongoose.Schema({
    moduleId: {
        type: String,
        required: true,
        trim: true,
        ref: 'Module'
    },
    blockId: {
        type: String,
        required: true,
        trim: true,
        ref: 'Block'
    },
    description: {
        type: String,
        required: true
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

// Virtuals
moduleBlockSchema.virtual('module', {
    ref: 'Module',
    localField: 'moduleId',
    foreignField: 'moduleId',
    justOne: true
});
moduleBlockSchema.virtual('block', {
    ref: 'Block',
    localField: 'blockId',
    foreignField: 'blockId',
    justOne: true
});

const ModuleBlock = mongoose.model('ModuleBlock', moduleBlockSchema);
module.exports = ModuleBlock;