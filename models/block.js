import mongoose from 'mongoose'

const blockSchema = new mongoose.Schema({
    blockId: {
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
    description: {
        type: String
    }
}, {
    timestamps: true
});


const Block = mongoose.model('Block', blockSchema);
export default Block;