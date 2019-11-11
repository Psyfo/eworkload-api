import OfferingType from '../models/offering-type.model';

let offeringType = async (offeringTypeId: string) => {
  return await OfferingType.findOne({ offeringTypeId: offeringTypeId });
};
let offeringTypes = async () => {
  return await OfferingType.find({});
};
let addOfferingType = async (offeringType: any) => {
  const newOfferingType = await new OfferingType(offeringType);

  return await newOfferingType.save();
};
let editOfferingType = async (offeringType: any) => {
  return await OfferingType.findOneAndUpdate(
    { offeringTypeId: offeringType.offeringTypeId },
    {
      $set: offeringType
    },
    { upsert: true }
  );
};
let deleteOfferingType = async (offeringType: any) => {
  return await OfferingType.findOneAndRemove(offeringType);
};

export {
  offeringType,
  offeringTypes,
  addOfferingType,
  editOfferingType,
  deleteOfferingType
};
