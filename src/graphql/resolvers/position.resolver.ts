import PositionController from '../../controllers/position.controller';

export default {
  Query: {
    position: async (root: any, { positionId }: any) => {
      return await PositionController.position(positionId);
    },
    positions: async () => {
      return await PositionController.positions();
    }
  },
  Mutation: {
    addPosition: async (root: any, { position }: any) => {
      return await PositionController.createPosition(position);
    },
    editPosition: async (root: any, { position }: any) => {
      return await PositionController.updatePosition(position);
    },
    deletePosition: async (root: any, { position }: any) => {
      return await PositionController.deletePosition(position);
    }
  }
};
