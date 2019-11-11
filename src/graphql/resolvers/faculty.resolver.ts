import * as FacultyMethods from '../../controllers/faculty.controller';

export default {
  Query: {
    faculty: async (root: any, { facultyId }: any) => {
      return await FacultyMethods.faculty(facultyId);
    },
    faculties: async () => {
      return await FacultyMethods.faculties();
    }
  },
  Mutation: {
    addFaculty: async (root: any, { faculty }: any) => {
      return await FacultyMethods.addFaculty(faculty);
    },
    editFaculty: async (root: any, { faculty }: any) => {
      return await FacultyMethods.editFaculty(faculty);
    },
    deleteFaculty: async (root: any, { faculty }: any) => {
      return await FacultyMethods.deleteFaculty(faculty);
    }
  }
};
