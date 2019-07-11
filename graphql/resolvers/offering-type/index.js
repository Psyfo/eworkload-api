import * as OfferingTypeMethods from '../../../controllers/offering-type';
export default {
  Query: {
    offeringType: (root, args) => {
      return OfferingTypeMethods.offeringType(args.offeringTypeId);
    },
    offeringTypes: () => {
      return OfferingTypeMethods.offeringTypes();
    }
  },
  Mutation: {
    addOfferingType: (root, args) => {
      return OfferingTypeMethods.addOfferingType(args.offeringType);
    },
    editOfferingType: (root, args) => {
      return OfferingTypeMethods.editOfferingType(args.offeringType);
    },
    deleteOfferingType: (root, args) => {
      return OfferingTypeMethods.deleteOfferingType(args.offeringType);
    }
  }
};
