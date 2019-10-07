import mongoose from 'mongoose';
import Activity from './activity';

const academicAdministrationActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  evidence: {
    type: String
  }
});

const AcademicAdministrationActivity = Activity.discriminator(
  'AcademicAdministrationActivity',
  academicAdministrationActivitySchema
);
export default AcademicAdministrationActivity;
