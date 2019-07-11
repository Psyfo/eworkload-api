import * as PositionMethods from '../../../controllers/position';

export default {
  Query: {
    position: (root, args) => {
      return PositionMethods.position(args.positionId);
    },
    positions: () => {
      return PositionMethods.positions();
    }
  },
  Mutation: {
    addPosition: (root, args) => {
      return PositionMethods.addPosition(args.position);
    },
    editPosition: (root, args) => {
      return PositionMethods.editPosition(args.position);
    },
    deletePosition: (root, args) => {
      return PositionMethods.deletePosition(args.position);
    }
  }
};
