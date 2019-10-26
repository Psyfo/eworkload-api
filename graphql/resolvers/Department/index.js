import * as DepartmentMethods from '../../../controllers/department';

export default {
  Query: {
    department: async (root, args) => {
      return await DepartmentMethods.department(args.departmentId);
    },
    departments: async () => {
      return await DepartmentMethods.departments();
    }
  },
  Mutation: {
    addDepartment: async (root, args) => {
      return await DepartmentMethods.addDepartment(args.department);
    },
    editDepartment: async (root, args) => {
      return await DepartmentMethods.editDepartment(args.department);
    },
    deleteDepartment: async (root, args) => {
      return await DepartmentMethods.deleteDepartment(args.department);
    }
  }
};
