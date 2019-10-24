import * as StudentMethods from '../../../controllers/student';

export default {
  Query: {
    student: (root, args) => {
      return StudentMethods.student(args.studentId);
    },
    students: () => {
      return StudentMethods.students();
    },
    studentsUnassigned: (root, { userId }) => {
      return StudentMethods.studentsUnassigned(userId);
    }
  },
  Mutation: {
    addStudent: (root, args) => {
      return StudentMethods.addStudent(args.student);
    },
    editStudent: (root, args) => {
      return StudentMethods.editStudent(args.student);
    },
    deleteStudent: (root, args) => {
      return StudentMethods.deleteStudent(args.student);
    }
  }
};
