import Position from './../models/position.js';

let position = async positionId => {
  return await Position.findOne({ positionId: positionId });
};

let positions = async () => {
  return await Position.find({});
};

let addPosition = async position => {
  const newPosition = new Position(position);

  return await newPosition.save();
};

let editPosition = async position => {
  return await Position.findOneAndUpdate(
    { positionId: position.positionId },
    {
      $set: position
    },
    { upsert: true }
  );
};

let deletePosition = async position => {
  return await Position.findOneAndRemove(position);
};

export { position, positions, addPosition, editPosition, deletePosition };
