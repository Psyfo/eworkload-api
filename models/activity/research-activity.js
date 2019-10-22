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
  conferenceActivities: [
    {
      type: String
    }
  ],
  authors: [
    {
      type: String
    }
  ],
  url: {
    type: String,
    trim: true
  },
  dates: [
    {
      type: Date
    }
  ],
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
