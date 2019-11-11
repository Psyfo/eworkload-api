import { differenceBy } from 'lodash';

import Enrollment from '../models/enrollment.model';
import Qualification from '../models/qualification.model';

let qualification = async (qualificationId: string) => {
  return await Qualification.findOne({
    qualificationId: qualificationId
  }).populate('department');
};
let qualifications = async () => {
  return await Qualification.find({}).populate('department');
};
let qualificationsPostgraduate = async () => {
  return await Qualification.find({
    type: { $in: ['Masters', 'Doctorate'] }
  }).populate('department');
};
let qualificationsNoEnrollment = async () => {
  const year = new Date().getFullYear().toString();
  let enrollments = await Enrollment.find({ enrollmentYear: year });
  let qualifications = await Qualification.find({}).populate('department');
  let filteredQual = differenceBy(
    qualifications,
    enrollments,
    'qualificationId'
  );
  return filteredQual;
};
let addQualification = async (qualification: any) => {
  const newQualification = new Qualification(qualification);

  return await newQualification.save();
};
let editQualification = async (qualification: any) => {
  return await Qualification.findOneAndUpdate(
    { qualificationId: qualification.qualificationId },
    {
      $set: qualification
    },
    { upsert: true }
  );
};
let deleteQualification = async (qualification: any) => {
  return await Qualification.findOneAndRemove(qualification);
};

export {
  qualification,
  qualifications,
  qualificationsPostgraduate,
  qualificationsNoEnrollment,
  addQualification,
  editQualification,
  deleteQualification
};
