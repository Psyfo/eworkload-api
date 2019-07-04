import mongoose from 'mongoose';
import Activity from './activity';

const researchActivitySchema = new mongoose.Schema({
  researchType: {
    type: String,
    required: true,
    trim: true
  },
  researchUrl: {
    type: String,
    required: true,
    trim: true
  }
});

const ResearchActivity = Activity.discriminator(
  'ResearchActivity',
  researchActivitySchema
);
export default ResearchActivity;
