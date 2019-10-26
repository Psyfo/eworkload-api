import * as WorkFocusMethods from './../../../controllers/work-focus';

export default {
  Query: {
    workFocus: async (root, { name }) => {
      return await WorkFocusMethods.workFocus(name);
    },
    workFocuses: async () => {
      return await WorkFocusMethods.workFocuses();
    }
  },
  Mutation: {
    addWorkFocus: async (root, { workFocus }) => {
      return await WorkFocusMethods.addWorkFocus(workFocus);
    },
    editWorkFocus: async (root, { workFocus }) => {
      return await WorkFocusMethods.editWorkFocus(workFocus);
    },
    deleteWorkFocus: async (root, { workFocus }) => {
      return await WorkFocusMethods.deleteWorkFocus(workFocus);
    }
  }
};
