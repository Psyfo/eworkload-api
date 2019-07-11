import Duty from './../models/duty.js';

let duty = async dutyId => {
  return await Duty.findOne({ dutyId: dutyId });
};

let duties = async () => {
  return await Duty.find({});
};

let addDuty = async duty => {
  const newDuty = await new Duty(duty);

  return await newDuty.save();
};

let editDuty = async duty => {
  return await Duty.findOneAndUpdate(
    { dutyId: duty.dutyId },
    {
      $set: duty
    },
    { upsert: true }
  );
};

let deleteDuty = async duty => {
  return await Duty.findOneAndRemove(duty);
};

export { duty, duties, addDuty, editDuty, deleteDuty };
