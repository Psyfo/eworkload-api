import DepartmentController from '../../controllers/department.controller';

export default {
  Query: {
    department: async (root: any, { departmentId }: any) => {
      return await DepartmentController.department(departmentId);
    },
    departments: async () => {
      return await DepartmentController.departments();
    }
  },
  Mutation: {
    addDepartment: async (root: any, { department }: any) => {
      return await DepartmentController.createDepartment(department);
    },
    editDepartment: async (root: any, { department }: any) => {
      return await DepartmentController.updateDepartment(department);
    },
    deleteDepartment: async (root: any, { department }: any) => {
      return await DepartmentController.deleteDepartment(department);
    }
  }
};
