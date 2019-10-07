import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: [true, 'The filename is necessary']
    },
    mimetype: {
      type: String,
      required: [true, 'The mimetype is necessary']
    },
    path: {
      type: String,
      required: [true, 'The path is necessary']
    },
    createdAt: {
      type: Date
    },
    updatedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Upload = mongoose.model('Upload', uploadSchema);
export default Upload;
