import IPosition from 'interfaces/position.interface';

import Position from '../models/position.model';

export default class PositionController {
  public static async position(positionId: string) {
    return await Position.findOne({ positionId: positionId });
  }
  public static async positions() {
    return await Position.find({});
  }
  public static async createPosition(position: IPosition) {
    return await position.save();
  }
  public static async updatePosition(position: IPosition) {
    return await Position.findOneAndUpdate(
      { positionId: position.positionId },
      {
        $set: position
      },
      { upsert: true }
    );
  }
  public static async deletePosition(position: IPosition) {
    return await Position.findOneAndRemove(position);
  }
}
