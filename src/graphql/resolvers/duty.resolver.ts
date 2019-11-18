import DutyController from '../../controllers/duty.controller';

export default {
  Query: {
    duty: async (root: any, { dutyId }: any) => {
      return await DutyController.duty(dutyId);
    },
    duties: async () => {
      return await DutyController.duties();
    }
  },
  Mutation: {
    addDuty: async (root: any, { duty }: any) => {
      return await DutyController.createDuty(duty);
    },
    editDuty: async (root: any, { duty }: any) => {
      return await DutyController.updateDuty(duty);
    },
    deleteDuty: async (root: any, { duty }: any) => {
      return await DutyController.deleteDuty(duty);
    }
  }
};
