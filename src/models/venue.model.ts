import mongoose from 'mongoose';

const venueSchema = new mongoose.Schema(
  {
    venueId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    campus: {
      type: String,
      required: true,
      trim: true
    },
    capacity: {
      type: Number,
      required: true
    },
    type: {
      type: String
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

const Venue = mongoose.model('Venue', venueSchema);
export default Venue;
