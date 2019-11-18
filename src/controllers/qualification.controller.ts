import IQualification from 'interfaces/qualification.interface';
import Enrollment from '../models/enrollment.model';
import Qualification from '../models/qualification.model';
import IEnrollment from 'interfaces/enrollment.interface';

export default class QualificationController {
  public static async qualification(qualificationId: string) {
    return await Qualification.findOne({
      qualificationId: qualificationId
    }).populate('department');
  }
  public static async qualifications() {
    return await Qualification.find({}).populate('department');
  }
  public static async qualificationsByLevel(level: string[]) {
    return await Qualification.find({
      type: { $in: level }
    }).populate('department');
  }
  public static async qualificationsUnenrolled() {
    const year = new Date().getFullYear().toString();
    const enrollments: any = await Enrollment.find({ enrollmentYear: year });
    const qualifications: string[] = enrollments.map(
      (enrollment: IEnrollment) => {
        return enrollment.qualificationId;
      }
    );
    return Qualification.find({ qualificationId: { $nin: qualifications } });
  }
  public static async createQualification(qualification: IQualification) {
    return await qualification.save();
  }
  public static async updateQualification(qualification: IQualification) {
    return await Qualification.findOneAndUpdate(
      { qualificationId: qualification.qualificationId },
      {
        $set: qualification
      },
      { upsert: true }
    );
  }
  public static async deleteQualification(qualification: IQualification) {
    return await Qualification.findOneAndRemove(qualification);
  }
}
