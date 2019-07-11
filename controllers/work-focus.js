import WorkFocus from './../models/work-focus';

let workFocus = async name => {
  return await WorkFocus.findOne({ name: name });
};

let workFocuses = async () => {
  return await WorkFocus.find({});
};

let addWorkFocus = async workFocus => {
  const newWorkFocus = new WorkFocus(workFocus);

  return await newWorkFocus.save();
};

let editWorkFocus = async workFocus => {
  return await WorkFocus.findOneAndUpdate(
    { workFocusId: workFocus.workFocusId },
    {
      $set: workFocus
    },
    { upsert: true }
  );
};

let deleteWorkFocus = async workFocus => {
  return await WorkFocus.findOneAndRemove(workFocus);
};

export { workFocus, workFocuses, addWorkFocus, editWorkFocus, deleteWorkFocus };
