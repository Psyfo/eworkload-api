import Faculty from '../models/faculty.model';
import IFaculty from 'interfaces/faculty.interface';

export default class FacultyController {
  public static async faculty(facultyId: string) {
    return await Faculty.findOne({ facultyId: facultyId });
  }
  public static async faculties() {
    return await Faculty.find({});
  }
  public static async createFaculty(faculty: IFaculty) {
    return await faculty.save();
  }
  public static async updateFaculty(faculty: IFaculty) {
    return await Faculty.findOneAndUpdate(
      { facultyId: faculty.facultyId },
      {
        $set: faculty
      },
      { upsert: true }
    );
  }
  public static async deleteFaculty(faculty: IFaculty) {
    return await Faculty.findOneAndRemove(faculty);
  }
}
