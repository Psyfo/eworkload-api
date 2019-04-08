import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema(
  {
    facultyId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Faculty = mongoose.model('Faculty', facultySchema);
export default Faculty;
