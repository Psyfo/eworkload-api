import * as BlockMethods from '../../../controllers/block';

export default {
  Query: {
    block: async (root, args) => {
      return await BlockMethods.block(args.blockId);
    },
    blocks: async () => {
      return await BlockMethods.blocks();
    }
  },
  Mutation: {
    addBlock: async (root, args) => {
      return await BlockMethods.addBlock(args.block);
    },
    editBlock: async (root, args) => {
      return await BlockMethods.editBlock(args.block);
    },
    deleteBlock: async (root, args) => {
      return await BlockMethods.deleteBlock(args.block);
    }
  }
};
