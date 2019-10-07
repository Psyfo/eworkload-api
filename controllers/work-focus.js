import WorkFocus from './../models/work-focus';
import User from '../models/user';
import parameters from '../config/parameters';

let workFocus = async name => {
  return await WorkFocus.findOne({ name: name });
};
let workFocuses = async () => {
  return await WorkFocus.find({});
};

let teachingHours = async userId => {
  let user = await User.findOne({ userId: userId }).populate('work-focus');
  let workFocusVar = await workFocus(user.workFocusName);
  let teachingFocusPercentage = workFocusVar.teachingRatio;

  return (teachingFocusPercentage / 100) * parameters.annual_total_hours;
};
let researchHours = async userId => {
  let user = await User.findOne({ userId: userId }).populate('work-focus');
  let workFocusVar = await workFocus(user.workFocusName);
  let researchFocusPercentage = workFocusVar.researchRatio;

  return (researchFocusPercentage / 100) * parameters.annual_total_hours;
};
let serviceHours = async userId => {
  let user = await User.findOne({ userId: userId }).populate('work-focus');
  let workFocusVar = await workFocus(user.workFocusName);
  let serviceFocusPercentage = workFocusVar.serviceRatio;

  return (serviceFocusPercentage / 100) * parameters.annual_total_hours;
};
let annualHours = async () => {
  return parameters.annual_total_hours;
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

export {
  workFocus,
  workFocuses,
  teachingHours,
  researchHours,
  serviceHours,
  annualHours,
  addWorkFocus,
  editWorkFocus,
  deleteWorkFocus
};
