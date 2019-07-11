import Student from './../models/student.js';

let student = async studentId => {
  return await Student.findOne({ studentId: studentId });
};

let students = async () => {
  return await Student.find({});
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

export { student, students, addStudent, editStudent, deleteStudent };
