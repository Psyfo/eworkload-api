import Student from '../models/student.model';
import * as SupervisionMethods from './activity/supervision.controller';

let student = async (studentId: string) => {
  return await Student.findOne({ studentId: studentId });
};
let students = async () => {
  return await Student.find({});
};
let studentsUnassigned = async (userId: string) => {
  // supervision activities
  const activities: any = await SupervisionMethods.supervisionActivitiesByUser(
    userId
  );
  // students already assigned
  const students: string[] = activities.map((activity: any) => {
    return activity.student.studentId;
  });

  return await Student.find({ studentId: { $nin: students } });
};
let addStudent = async (student: any) => {
  const newStudent = new Student(student);

  return await newStudent.save();
};
let editStudent = async (student: any) => {
  return await Student.findOneAndUpdate(
    { studentId: student.studentId },
    {
      $set: student
    }
  );
};
let deleteStudent = async (student: any) => {
  return await Student.findOneAndRemove(student);
};

export {
  student,
  students,
  studentsUnassigned,
  addStudent,
  editStudent,
  deleteStudent
};
