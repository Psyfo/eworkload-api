import * as PositionMethods from '../../controllers/position.controller';

export default {
  Query: {
    position: async (root: any, { positionId }: any) => {
      return await PositionMethods.position(positionId);
    },
    positions: async () => {
      return await PositionMethods.positions();
    }
  },
  Mutation: {
    addPosition: async (root: any, { position }: any) => {
      return await PositionMethods.addPosition(position);
    },
    editPosition: async (root: any, { position }: any) => {
      return await PositionMethods.editPosition(position);
    },
    deletePosition: async (root: any, { position }: any) => {
      return await PositionMethods.deletePosition(position);
    }
  }
};
