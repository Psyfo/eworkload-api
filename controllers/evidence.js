import Evidence from './../models/evidence';

let evidence = async evidenceId => {
  return await Evidence.findOne({ evidenceId: evidenceId });
};
let evidences = async () => {
  return await Evidence.find({});
};

let addEvidence = async evidence => {
  const newEvidence = new Evidence(evidence);

  return newEvidence.save();
};
let editEvidence = async evidence => {
  return await Evidence.findOneAndUpdate(
    { evidenceId: evidence.evidenceId },
    {
      $set: evidence
    },
    { upsert: true }
  );
};
let deleteEvidence = async evidence => {
  return await Evidence.findOneAndRemove(evidence);
};

export { evidence, evidences, addEvidence, editEvidence, deleteEvidence };
