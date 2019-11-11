import Position from '../models/position.model';

let position = async (positionId: string) => {
  return await Position.findOne({ positionId: positionId });
};
let positions = async () => {
  return await Position.find({});
};
let addPosition = async (position: any) => {
  const newPosition = new Position(position);

  return await newPosition.save();
};
let editPosition = async (position: any) => {
  return await Position.findOneAndUpdate(
    { positionId: position.positionId },
    {
      $set: position
    },
    { upsert: true }
  );
};
let deletePosition = async (position: any) => {
  return await Position.findOneAndRemove(position);
};

export { position, positions, addPosition, editPosition, deletePosition };
