import * as WorkFocusMethods from '../../controllers/work-focus.controller';

export default {
  Query: {
    workFocus: async (root: any, { name }: any) => {
      return await WorkFocusMethods.workFocus(name);
    },
    workFocuses: async () => {
      return await WorkFocusMethods.workFocuses();
    }
  },
  Mutation: {
    addWorkFocus: async (root: any, { workFocus }: any) => {
      return await WorkFocusMethods.addWorkFocus(workFocus);
    },
    editWorkFocus: async (root: any, { workFocus }: any) => {
      return await WorkFocusMethods.editWorkFocus(workFocus);
    },
    deleteWorkFocus: async (root: any, { workFocus }: any) => {
      return await WorkFocusMethods.deleteWorkFocus(workFocus);
    }
  }
};
