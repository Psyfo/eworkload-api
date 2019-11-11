import * as BlockMethods from '../../controllers/block.controller';

export default {
  Query: {
    block: async (root: any, { blockId }: any) => {
      return await BlockMethods.block(blockId);
    },
    blocks: async () => {
      return await BlockMethods.blocks();
    }
  },
  Mutation: {
    addBlock: async (root: any, { block }: any) => {
      return await BlockMethods.addBlock(block);
    },
    editBlock: async (root: any, { block }: any) => {
      return await BlockMethods.editBlock(block);
    },
    deleteBlock: async (root: any, { block }: any) => {
      return await BlockMethods.deleteBlock(block);
    }
  }
};
