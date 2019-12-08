import IEnrollment from 'interfaces/enrollment.interface';

import Enrollment from '../models/enrollment.model';

export default class EnrollmentController {
  public static async enrollment(id: string) {
    return await Enrollment.findOne({
      _id: id
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
    return await new Enrollment(enrollment).save();
  }
  public static async updateEnrollment(enrollment: IEnrollment) {
    return await Enrollment.findOneAndUpdate(
      {
        _id: enrollment.id
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
