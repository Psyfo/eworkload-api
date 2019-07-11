import * as DutyMethods from '../../../controllers/duty';

export default {
  Query: {
    duty: (root, args) => {
      return DutyMethods.duty(args.dutyId);
    },
    duties: () => {
      return DutyMethods.duties();
    }
  },
  Mutation: {
    addDuty: (root, args) => {
      return DutyMethods.addDuty(args.duty);
    },
    editDuty: (root, args) => {
      return DutyMethods.editDuty(args.duty);
    },
    deleteDuty: (root, args) => {
      return DutyMethods.deleteDuty(args.duty);
    }
  }
};
