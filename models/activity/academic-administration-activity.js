import mongoose from 'mongoose';
import Activity from './activity';

const academicAdministrationActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  qualificationId: {
    type: String
  },
  description: {
    type: String,
    trim: true
  },
  evidence: {
    type: String
  }
});

academicAdministrationActivitySchema.virtual('qualification', {
  ref: 'Qualification',
  localField: 'qualificationId',
  foreignField: 'qualificationId',
  justOne: true
});

const AcademicAdministrationActivity = Activity.discriminator(
  'AcademicAdministrationActivity',
  academicAdministrationActivitySchema
);
export default AcademicAdministrationActivity;
