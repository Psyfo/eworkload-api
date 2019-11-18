import FacultyController from '../../controllers/faculty.controller';

export default {
  Query: {
    faculty: async (root: any, { facultyId }: any) => {
      return await FacultyController.faculty(facultyId);
    },
    faculties: async () => {
      return await FacultyController.faculties();
    }
  },
  Mutation: {
    addFaculty: async (root: any, { faculty }: any) => {
      return await FacultyController.createFaculty(faculty);
    },
    editFaculty: async (root: any, { faculty }: any) => {
      return await FacultyController.updateFaculty(faculty);
    },
    deleteFaculty: async (root: any, { faculty }: any) => {
      return await FacultyController.deleteFaculty(faculty);
    }
  }
};
