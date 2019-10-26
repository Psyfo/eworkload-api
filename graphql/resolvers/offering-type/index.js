import * as OfferingTypeMethods from '../../../controllers/offering-type';
export default {
  Query: {
    offeringType: async (root, args) => {
      return await OfferingTypeMethods.offeringType(args.offeringTypeId);
    },
    offeringTypes: async () => {
      return await OfferingTypeMethods.offeringTypes();
    }
  },
  Mutation: {
    addOfferingType: async (root, args) => {
      return await OfferingTypeMethods.addOfferingType(args.offeringType);
    },
    editOfferingType: async (root, args) => {
      return await OfferingTypeMethods.editOfferingType(args.offeringType);
    },
    deleteOfferingType: async (root, args) => {
      return await OfferingTypeMethods.deleteOfferingType(args.offeringType);
    }
  }
};
