import BlockController from "../../controllers/block.controller";

export default {
  Query: {
    block: async (root: any, { blockId }: any) => {
      return BlockController.block(blockId);
    },
    blocks: async () => {
      return BlockController.blocks();
    }
  },
  Mutation: {
    addBlock: async (root: any, { block }: any) => {
      return BlockController.createBlock(block);
    },
    editBlock: async (root: any, { block }: any) => {
      return BlockController.updateBlock(block);
    },
    deleteBlock: async (root: any, { block }: any) => {
      return BlockController.deleteBlock(block);
    }
  }
};
