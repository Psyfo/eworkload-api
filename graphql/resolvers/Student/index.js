import * as StudentMethods from '../../../controllers/student';

export default {
  Query: {
    student: async (root, args) => {
      return await StudentMethods.student(args.studentId);
    },
    students: async () => {
      return await StudentMethods.students();
    },
    studentsUnassigned: async (root, { userId }) => {
      return await StudentMethods.studentsUnassigned(userId);
    }
  },
  Mutation: {
    addStudent: async (root, args) => {
      return await StudentMethods.addStudent(args.student);
    },
    editStudent: async (root, args) => {
      return await StudentMethods.editStudent(args.student);
    },
    deleteStudent: async (root, args) => {
      return await StudentMethods.deleteStudent(args.student);
    }
  }
};
