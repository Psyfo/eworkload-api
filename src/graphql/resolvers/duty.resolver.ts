import * as DutyMethods from '../../controllers/duty.controller';

export default {
  Query: {
    duty: async (root: any, { dutyId }: any) => {
      return await DutyMethods.duty(dutyId);
    },
    duties: async () => {
      return await DutyMethods.duties();
    }
  },
  Mutation: {
    addDuty: async (root: any, { duty }: any) => {
      return await DutyMethods.addDuty(duty);
    },
    editDuty: async (root: any, { duty }: any) => {
      return await DutyMethods.editDuty(duty);
    },
    deleteDuty: async (root: any, { duty }: any) => {
      return await DutyMethods.deleteDuty(duty);
    }
  }
};
