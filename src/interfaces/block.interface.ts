import { Document } from 'mongoose';

export default interface IBlock extends Document {
  blockId: string;
  name: string;
  description?: string;
}

export interface BlockModel extends IBlock, Document {}
