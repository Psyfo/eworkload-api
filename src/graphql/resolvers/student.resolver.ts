import * as StudentMethods from '../../controllers/student.controller';

export default {
  Query: {
    student: async (root: any, { studentId }: any) => {
      return await StudentMethods.student(studentId);
    },
    students: async () => {
      return await StudentMethods.students();
    },
    studentsUnassigned: async (root: any, { userId }: any) => {
      return await StudentMethods.studentsUnassigned(userId);
    }
  },
  Mutation: {
    addStudent: async (root: any, { student }: any) => {
      return await StudentMethods.addStudent(student);
    },
    editStudent: async (root: any, { student }: any) => {
      return await StudentMethods.editStudent(student);
    },
    deleteStudent: async (root: any, { student }: any) => {
      return await StudentMethods.deleteStudent(student);
    }
  }
};
