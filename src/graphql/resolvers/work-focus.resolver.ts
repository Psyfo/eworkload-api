import WorkFocusController from '../../controllers/work-focus.controller';

export default {
  Query: {
    workFocus: async (root: any, { name }: any) => {
      return await WorkFocusController.workFocus(name);
    },
    workFocuses: async () => {
      return await WorkFocusController.workFocuses();
    }
  },
  Mutation: {
    addWorkFocus: async (root: any, { workFocus }: any) => {
      return await WorkFocusController.createWorkFocus(workFocus);
    },
    editWorkFocus: async (root: any, { workFocus }: any) => {
      return await WorkFocusController.updateWorkFocus(workFocus);
    },
    deleteWorkFocus: async (root: any, { workFocus }: any) => {
      return await WorkFocusController.deleteWorkFocus(workFocus);
    }
  }
};
