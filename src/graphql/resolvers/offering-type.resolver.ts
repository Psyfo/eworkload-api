import OfferingTypeController from '../../controllers/offering-type.controller';

export default {
  Query: {
    offeringType: async (root: any, { offeringTypeId }: any) => {
      return await OfferingTypeController.offeringType(offeringTypeId);
    },
    offeringTypes: async () => {
      return await OfferingTypeController.offeringTypes();
    }
  },
  Mutation: {
    addOfferingType: async (root: any, { offeringType }: any) => {
      return await OfferingTypeController.createOfferingType(offeringType);
    },
    editOfferingType: async (root: any, { offeringType }: any) => {
      return await OfferingTypeController.updateOfferingType(offeringType);
    },
    deleteOfferingType: async (root: any, { offeringType }: any) => {
      return await OfferingTypeController.deleteOfferingType(offeringType);
    }
  }
};
