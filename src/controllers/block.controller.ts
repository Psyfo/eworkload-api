import { default as BlockModel } from '../models/block.model';

let block = async (blockId: string) => {
  return await BlockModel.findOne({ blockId: blockId });
};
let blocks = async () => {
  return await BlockModel.find({});
};
let addBlock = async (block: any) => {
  const newBlock = await new BlockModel(block);

  return await newBlock.save();
};
let editBlock = async (block: any) => {
  return await BlockModel.findOneAndUpdate(
    { blockId: block.blockId },
    {
      $set: block
    },
    { upsert: true }
  );
};
let deleteBlock = async (block: any) => {
  return await BlockModel.findOneAndRemove(block);
};

export { block, blocks, addBlock, editBlock, deleteBlock };

class Block {}
