import Block from './../models/block.js';

let block = async blockId => {
  return await Block.findOne({ blockId: blockId });
};

let blocks = async () => {
  return await Block.find({});
};

let addBlock = async block => {
  const newBlock = await new Block(block);

  return await newBlock.save();
};

let editBlock = async block => {
  return await Block.findOneAndUpdate(
    { blockId: block.blockId },
    {
      $set: block
    },
    { upsert: true }
  );
};

let deleteBlock = async block => {
  return await Block.findOneAndRemove(block);
};

export { block, blocks, addBlock, editBlock, deleteBlock };
