import * as PositionMethods from '../../../controllers/position';

export default {
  Query: {
    position: async (root, args) => {
      return await PositionMethods.position(args.positionId);
    },
    positions: async () => {
      return await PositionMethods.positions();
    }
  },
  Mutation: {
    addPosition: async (root, args) => {
      return await PositionMethods.addPosition(args.position);
    },
    editPosition: async (root, args) => {
      return await PositionMethods.editPosition(args.position);
    },
    deletePosition: async (root, args) => {
      return await PositionMethods.deletePosition(args.position);
    }
  }
};
