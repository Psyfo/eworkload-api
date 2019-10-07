import mongoose from 'mongoose';
import Activity from './activity';

const personnelDevelopmentActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: [
    {
      type: String
    }
  ],
  duration: {
    type: String
  },
  evidence: {
    type: String
  }
});

const PersonnelDevelopmentActivity = Activity.discriminator(
  'PersonnelDevelopmentActivity',
  personnelDevelopmentActivitySchema
);
export default PersonnelDevelopmentActivity;
