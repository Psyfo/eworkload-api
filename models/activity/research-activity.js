import mongoose from 'mongoose';
import Activity from './activity';

const researchActivitySchema = new mongoose.Schema({
  output: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  details: {
    type: String,
    required: true,
    trim: true
  },
  evidenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evidence'
  }
});

const ResearchActivity = Activity.discriminator(
  'ResearchActivity',
  researchActivitySchema
);
export default ResearchActivity;
