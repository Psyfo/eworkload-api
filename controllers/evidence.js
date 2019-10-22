import Evidence from './../models/evidence';

let evidence = async evidenceId => {
  return await Evidence.findOne({ evidenceId: evidenceId });
};
let evidences = async () => {
  return await Evidence.find({});
};

let updateEvidence = async evidence => {
  return await Evidence.findOneAndUpdate(
    { activityId: evidence.activityId },
    {
      $set: evidence
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
};
let deleteEvidence = async evidence => {
  return await Evidence.findOneAndRemove(evidence);
};

export { evidence, evidences, updateEvidence, deleteEvidence };
