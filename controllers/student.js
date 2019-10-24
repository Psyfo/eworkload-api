import Student from './../models/student.js';
import * as SupervisionMethods from './../controllers/activity/supervision';

let student = async studentId => {
  return await Student.findOne({ studentId: studentId });
};
let students = async () => {
  return await Student.find({});
};

let studentsUnassigned = async userId => {
  // supervision activities
  const activities = await SupervisionMethods.supervisionActivitiesByUser(
    userId
  );
  // students already assigned
  const students = activities.map(activity => {
    return activity.student.studentId;
  });
  console.log('Students: ', students);

  return await Student.find({ studentId: { $nin: students } });
};
let addStudent = async student => {
  const newStudent = new Student(student);

  return await newStudent.save();
};
let editStudent = async student => {
  return await Student.findOneAndUpdate(
    { studentId: student.studentId },
    {
      $set: student
    }
  );
};
let deleteStudent = async student => {
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
