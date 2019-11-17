import IBlock from 'interfaces/block.interface';
import { Document } from 'mongoose';

import Block from '../models/block.model';

export default class BlockController {
  constructor() {}

  static async block(blockId: string): Promise<Document | null> {
    return await Block.findOne({ blockId: blockId });
  }
  static async blocks(): Promise<Document[] | null> {
    return await Block.find({});
  }
  static async createBlock(block: IBlock): Promise<Document | null> {
    const newBlock = await new Block(block);
    return block.save();
  }
  static async updateBlock(block: IBlock): Promise<Document | null> {
    return await Block.findOneAndUpdate(
      { blockId: block.blockId },
      {
        $set: block
      },
      { upsert: true }
    );
  }
  static async deleteBlock(block: IBlock): Promise<Document | null> {
    return await Block.findOneAndRemove(block);
  }
}
