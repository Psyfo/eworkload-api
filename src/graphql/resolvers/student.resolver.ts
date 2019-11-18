import StudentController from '../../controllers/student.controller';

export default {
  Query: {
    student: async (root: any, { studentId }: any) => {
      return await StudentController.student(studentId);
    },
    students: async () => {
      return await StudentController.students();
    },
    studentsUnassigned: async (root: any, { userId }: any) => {
      return await StudentController.studentsUnassigned(userId);
    }
  },
  Mutation: {
    addStudent: async (root: any, { student }: any) => {
      return await StudentController.createStudent(student);
    },
    editStudent: async (root: any, { student }: any) => {
      return await StudentController.updateStudent(student);
    },
    deleteStudent: async (root: any, { student }: any) => {
      return await StudentController.deleteStudent(student);
    }
  }
};
