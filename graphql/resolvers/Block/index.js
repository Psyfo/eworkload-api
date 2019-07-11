import * as BlockMethods from '../../../controllers/block';

export default {
  Query: {
    block: (root, args) => {
      return BlockMethods.block(args.blockId);
    },
    blocks: () => {
      return BlockMethods.blocks();
    }
  },
  Mutation: {
    addBlock: (root, args) => {
      return BlockMethods.addBlock(args.block);
    },
    editBlock: (root, args) => {
      return BlockMethods.editBlock(args.block);
    },
    deleteBlock: (root, args) => {
      return BlockMethods.deleteBlock(args.block);
    }
  }
};
