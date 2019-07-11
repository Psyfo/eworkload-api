import mongoose from 'mongoose';
import Activity from './activity';

const personnelDevelopmentActivitySchema = new mongoose.Schema({
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
  evidenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evidence'
  }
});

const PersonnelDevelopmentActivity = Activity.discriminator(
  'PersonnelDevelopmentActivity',
  personnelDevelopmentActivitySchema
);
export default PersonnelDevelopmentActivity;
