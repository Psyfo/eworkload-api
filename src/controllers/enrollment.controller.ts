import Enrollment from '../models/enrollment.model';

let enrollment = async (enrollmentYear: string, qualificationId: string) => {
  return await Enrollment.findOne({
    enrollmentYear: enrollmentYear,
    qualificationId: qualificationId
  }).populate('qualification');
};
let enrollments = async () => {
  return await Enrollment.find({}).populate('qualification');
};
let enrollmentsByYear = async (enrollmentYear: string) => {
  return await Enrollment.find({ enrollmentYear: enrollmentYear }).populate(
    'qualification'
  );
};
let enrollmentsByQualification = async (qualificationId: string) => {
  return await Enrollment.find({ qualificationId: qualificationId }).populate(
    'qualification'
  );
};
let addEnrollment = async (enrollment: any) => {
  const newEnrollment = await new Enrollment(enrollment);

  return await newEnrollment.save();
};
let editEnrollment = async (enrollment: any) => {
  return await Enrollment.findOneAndUpdate(
    { enrollmentId: enrollment.enrollmentId },
    {
      $set: enrollment
    },
    { upsert: true }
  );
};
let deleteEnrollment = async (enrollment: any) => {
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
