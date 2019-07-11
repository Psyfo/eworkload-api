import * as WorkFocusMethods from '../../../controllers/work-focus';

export default {
  Query: {
    workFocus: (root, args) => {
      return WorkFocusMethods.workFocus(args.name);
    },
    workFocuses: () => {
      return WorkFocusMethods.workFocuses();
    }
  },
  Mutation: {
    addWorkFocus: (root, args) => {
      return WorkFocusMethods.addWorkFocus(args.workFocus);
    },
    editWorkFocus: (root, args) => {
      return WorkFocusMethods.editWorkFocus(args.workFocus);
    },
    deleteWorkFocus: (root, args) => {
      return WorkFocusMethods.deleteWorkFocus(args.workFocus);
    }
  }
};
