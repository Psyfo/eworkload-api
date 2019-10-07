import mongoose from 'mongoose';
import Activity from './activity';

const researchActivitySchema = new mongoose.Schema({
  output: {
    type: String,
    trim: true
  },
  title: {
    type: String,
    trim: true
  },
  details: {
    type: String,
    trim: true
  },
  evidence: {
    type: String
  }
});

const ResearchActivity = Activity.discriminator(
  'ResearchActivity',
  researchActivitySchema
);
export default ResearchActivity;
