import Student from '../models/student.model';
import SupervisionActivityController from './activity/supervision-activity.controller';
import IStudent from 'interfaces/student.interface';

export default class StudentController {
  public static async student(studentId: string) {
    return await Student.findOne({ studentId: studentId });
  }
  public static async students() {
    return await Student.find({});
  }
  public static async studentsUnassigned(userId: string) {
    // supervision activities
    const activities: any = await SupervisionActivityController.supervisionActivitiesByUser(
      userId
    );
    // students already assigned
    const students: string[] = activities.map((activity: any) => {
      return activity.student.studentId;
    });

    return await Student.find({ studentId: { $nin: students } });
  }
  public static async createStudent(student: IStudent) {
    return await student.save();
  }
  public static async updateStudent(student: IStudent) {
    return await Student.findOneAndUpdate(
      { studentId: student.studentId },
      {
        $set: student
      }
    );
  }
  public static async deleteStudent(student: IStudent) {
    return await Student.findOneAndRemove(student);
  }
}
