import * as WorkFocusMethods from '../../../controllers/work-focus';

export default {
  Query: {
    workFocus: (root, { name }) => {
      return WorkFocusMethods.workFocus(name);
    },
    workFocuses: () => {
      return WorkFocusMethods.workFocuses();
    }
  },
  Mutation: {
    addWorkFocus: (root, { workFocus }) => {
      return WorkFocusMethods.addWorkFocus(workFocus);
    },
    editWorkFocus: (root, { workFocus }) => {
      return WorkFocusMethods.editWorkFocus(workFocus);
    },
    deleteWorkFocus: (root, { workFocus }) => {
      return WorkFocusMethods.deleteWorkFocus(workFocus);
    }
  }
};
