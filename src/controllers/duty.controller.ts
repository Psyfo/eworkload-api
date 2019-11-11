import Duty from '../models/duty.model';

let duty = async (dutyId: string) => {
  return await Duty.findOne({ dutyId: dutyId });
};
let duties = async () => {
  return await Duty.find({});
};
let addDuty = async (duty: any) => {
  const newDuty = await new Duty(duty);

  return await newDuty.save();
};
let editDuty = async (duty: any) => {
  return await Duty.findOneAndUpdate(
    { dutyId: duty.dutyId },
    {
      $set: duty
    },
    { upsert: true }
  );
};
let deleteDuty = async (duty: any) => {
  return await Duty.findOneAndRemove(duty);
};

export { duty, duties, addDuty, editDuty, deleteDuty };
