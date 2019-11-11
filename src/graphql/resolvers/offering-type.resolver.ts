import * as OfferingTypeMethods from '../../controllers/offering-type.controller';

export default {
  Query: {
    offeringType: async (root: any, { offeringTypeId }: any) => {
      return await OfferingTypeMethods.offeringType(offeringTypeId);
    },
    offeringTypes: async () => {
      return await OfferingTypeMethods.offeringTypes();
    }
  },
  Mutation: {
    addOfferingType: async (root: any, { offeringType }: any) => {
      return await OfferingTypeMethods.addOfferingType(offeringType);
    },
    editOfferingType: async (root: any, { offeringType }: any) => {
      return await OfferingTypeMethods.editOfferingType(offeringType);
    },
    deleteOfferingType: async (root: any, { offeringType }: any) => {
      return await OfferingTypeMethods.deleteOfferingType(offeringType);
    }
  }
};
