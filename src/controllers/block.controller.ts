import IBlock from 'interfaces/block.interface';

import Block from '../models/block.model';

export default class BlockController {
  constructor() {}

  public static async block(blockId: string) {
    return await Block.findOne({ blockId: blockId });
  }
  public static async blocks() {
    return await Block.find({});
  }
  public static async createBlock(block: IBlock) {
    return block.save();
  }
  public static async updateBlock(block: IBlock) {
    return await Block.findOneAndUpdate(
      { blockId: block.blockId },
      {
        $set: block
      },
      { upsert: true }
    );
  }
  public static async deleteBlock(block: IBlock) {
    return await Block.findOneAndRemove(block);
  }
}
