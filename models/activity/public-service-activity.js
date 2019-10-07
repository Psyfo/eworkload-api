import mongoose from 'mongoose';
import Activity from './activity';

const publicServiceActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  evidence: {
    type: String
  }
});

// Virtuals

const PublicServiceActivity = Activity.discriminator(
  'PublicServiceActivity',
  publicServiceActivitySchema
);
export default PublicServiceActivity;
