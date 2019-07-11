import * as DepartmentMethods from '../../../controllers/department';

export default {
  Query: {
    department: (root, args) => {
      return DepartmentMethods.department(args.departmentId);
    },
    departments: () => {
      return DepartmentMethods.departments();
    }
  },
  Mutation: {
    addDepartment: (root, args) => {
      return DepartmentMethods.addDepartment(args.department);
    },
    editDepartment: (root, args) => {
      return DepartmentMethods.editDepartment(args.department);
    },
    deleteDepartment: (root, args) => {
      return DepartmentMethods.deleteDepartment(args.department);
    }
  }
};
