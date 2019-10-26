import * as DutyMethods from '../../../controllers/duty';

export default {
  Query: {
    duty: async (root, args) => {
      return await DutyMethods.duty(args.dutyId);
    },
    duties: async () => {
      return await DutyMethods.duties();
    }
  },
  Mutation: {
    addDuty: async (root, args) => {
      return await DutyMethods.addDuty(args.duty);
    },
    editDuty: async (root, args) => {
      return await DutyMethods.editDuty(args.duty);
    },
    deleteDuty: async (root, args) => {
      return await DutyMethods.deleteDuty(args.duty);
    }
  }
};
