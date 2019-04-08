import mongoose from 'mongoose';
import Block from './block';
import Module from './module';

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
export default ModuleBlock;