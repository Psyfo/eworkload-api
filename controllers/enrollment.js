import Enrollment from './../models/enrollment.js';

let enrollment = async (enrollmentYear, qualificationId) => {
  return await Enrollment.findOne({
    enrollmentYear: enrollmentYear,
    qualificationId: qualificationId
  }).populate('qualification');
};

let enrollments = async () => {
  return await Enrollment.find({}).populate('qualification');
};

let enrollmentsByYear = async enrollmentYear => {
  return await Enrollment.find({ enrollmentYear: enrollmentYear }).populate(
    'qualification'
  );
};

let enrollmentsByQualification = async qualificationId => {
  return await Enrollment.find({ qualificationId: qualificationId }).populate(
    'qualification'
  );
};

let addEnrollment = async enrollment => {
  const newEnrollment = await new Enrollment(enrollment);

  return await newEnrollment.save();
};

let editEnrollment = async enrollment => {
  return await Enrollment.findOneAndUpdate(
    { enrollmentId: enrollment.enrollmentId },
    {
      $set: enrollment
    },
    { upsert: true }
  );
};

let deleteEnrollment = async enrollment => {
  return await Enrollment.findOneAndRemove(enrollment);
};

export {
  enrollment,
  enrollments,
  enrollmentsByYear,
  enrollmentsByQualification,
  addEnrollment,
  editEnrollment,
  deleteEnrollment
};
