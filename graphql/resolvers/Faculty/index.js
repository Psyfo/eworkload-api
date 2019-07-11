import * as FacultyMethods from '../../../controllers/faculty';

export default {
  Query: {
    faculty: (root, args) => {
      return FacultyMethods.faculty(args.facultyId);
    },
    faculties: () => {
      return FacultyMethods.faculties();
    }
  },
  Mutation: {
    addFaculty: (root, args) => {
      return FacultyMethods.addFaculty(args.faculty);
    },
    editFaculty: (root, args) => {
      return FacultyMethods.editFaculty(args.faculty);
    },
    deleteFaculty: (root, args) => {
      return FacultyMethods.deleteFaculty(args.faculty);
    }
  }
};
