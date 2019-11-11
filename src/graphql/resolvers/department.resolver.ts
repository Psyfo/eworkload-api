import * as DepartmentMethods from '../../controllers/department.controller';

export default {
  Query: {
    department: async (root: any, { departmentId }: any) => {
      return await DepartmentMethods.department(departmentId);
    },
    departments: async () => {
      return await DepartmentMethods.departments();
    }
  },
  Mutation: {
    addDepartment: async (root: any, { department }: any) => {
      return await DepartmentMethods.addDepartment(department);
    },
    editDepartment: async (root: any, { department }: any) => {
      return await DepartmentMethods.editDepartment(department);
    },
    deleteDepartment: async (root: any, { department }: any) => {
      return await DepartmentMethods.deleteDepartment(department);
    }
  }
};
