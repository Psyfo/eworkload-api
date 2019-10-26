import * as FacultyMethods from '../../../controllers/faculty';

export default {
  Query: {
    faculty: async (root, args) => {
      return await FacultyMethods.faculty(args.facultyId);
    },
    faculties: async () => {
      return await FacultyMethods.faculties();
    }
  },
  Mutation: {
    addFaculty: async (root, args) => {
      return await FacultyMethods.addFaculty(args.faculty);
    },
    editFaculty: async (root, args) => {
      return await FacultyMethods.editFaculty(args.faculty);
    },
    deleteFaculty: async (root, args) => {
      return await FacultyMethods.deleteFaculty(args.faculty);
    }
  }
};
