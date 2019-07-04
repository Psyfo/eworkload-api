import mongoose from 'mongoose';
import Activity from './activity';
import Evident from './evidence';

const publicServiceActivitySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  evidenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evidence'
  }
});

// Virtuals
publicServiceActivitySchema.virtual('evidence', {
  ref: 'Evidence',
  localField: 'evidenceId',
  foreignField: 'evidenceId',
  justOne: true
});

const PublicServiceActivity = Activity.discriminator(
  'PublicServiceActivity',
  publicServiceActivitySchema
);
export default PublicServiceActivity;
