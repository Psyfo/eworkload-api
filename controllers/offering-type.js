import OfferingType from './../models/offering-type';

let offeringType = async offeringTypeId => {
  return await OfferingType.findOne({ offeringTypeId: offeringTypeId });
};

let offeringTypes = async () => {
  return await OfferingType.find({});
};

let addOfferingType = async offeringType => {
  const newOfferingType = await new OfferingType(offeringType);

  return await newOfferingType.save();
};

let editOfferingType = async offeringType => {
  return await OfferingType.findOneAndUpdate(
    { offeringTypeId: offeringType.offeringTypeId },
    {
      $set: offeringType
    },
    { upsert: true }
  );
};

let deleteOfferingType = async offeringType => {
  return await OfferingType.findOneAndRemove(offeringType);
};

export {
  offeringType,
  offeringTypes,
  addOfferingType,
  editOfferingType,
  deleteOfferingType
};
