import Qualification from './../models/qualification.js';
import Enrollment from './../models/enrollment';
import differenceBy from 'lodash/differenceBy';

let qualification = async qualificationId => {
  return await Qualification.findOne({
    qualificationId: qualificationId
  }).populate('department');
};

let qualifications = async () => {
  return await Qualification.find({}).populate('department');
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

let addQualification = async qualification => {
  const newQualification = new Qualification(qualification);

  return await newQualification.save();
};

let editQualification = async qualification => {
  return await Qualification.findOneAndUpdate(
    { qualificationId: qualification.qualificationId },
    {
      $set: qualification
    },
    { upsert: true }
  );
};

let deleteQualification = async qualification => {
  return await Qualification.findOneAndRemove(qualification);
};

export {
  qualification,
  qualifications,
  qualificationsNoEnrollment,
  addQualification,
  editQualification,
  deleteQualification
};
