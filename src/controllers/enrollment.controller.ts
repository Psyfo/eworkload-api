import IEnrollment from 'interfaces/enrollment.interface';

import Enrollment from '../models/enrollment.model';

export default class EnrollmentController {
  public static async enrollment(
    enrollmentYear: string,
    qualificationId: string
  ) {
    return await Enrollment.findOne({
      enrollmentYear: enrollmentYear,
      qualificationId: qualificationId
    }).populate('qualification');
  }
  public static async enrollments() {
    return await Enrollment.find({}).populate('qualification');
  }
  public static async enrollmentsByYear(enrollmentYear: string) {
    return await Enrollment.find({ enrollmentYear: enrollmentYear }).populate(
      'qualification'
    );
  }
  public static async enrollmentsByQualification(qualificationId: string) {
    return await Enrollment.find({ qualificationId: qualificationId }).populate(
      'qualification'
    );
  }
  public static async createEnrollment(enrollment: IEnrollment) {
    return await enrollment.save();
  }
  public static async updateEnrollment(enrollment: IEnrollment) {
    return await Enrollment.findOneAndUpdate(
      {
        enrollmentYear: enrollment.enrollmentYear,
        qualificationId: enrollment.qualificationId
      },
      {
        $set: enrollment
      },
      { upsert: true }
    ).populate('qualification');
  }
  public static async deleteEnrollment(enrollment: IEnrollment) {
    return await Enrollment.findOneAndRemove(enrollment).populate(
      'qualification'
    );
  }
}
