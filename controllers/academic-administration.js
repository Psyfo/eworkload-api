import AcademicAdministrationActivity from '../models/academic-administration-activity';
import parameters from '../config/parameters';
// import User from '../models/user';
// import Student from '../models/student';
// import parameters from '../config/parameters';

// AA METHODS
let academicAdministrationActivity = async activityId => {
  return await AcademicAdministrationActivity.findOne({
    activityId: activityId
  });
};

let academicAdministrationActivities = async () => {
  return await AcademicAdministrationActivity.find({});
};

let academicAdministrationActivitiesByUser = async userId => {
  return await AcademicAdministrationActivity.find({ userId: userId });
};

let addAcademicAdministrationActivity = async activity => {
  const newAcademicAdministrationActivity = await new AcademicAdministrationActivity(
    activity
  );

  return await newAcademicAdministrationActivity.save();
};

let editAcademicAdministrationActivity = async activity => {
  return await AcademicAdministrationActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  );
};

let deleteAcademicAdministrationActivity = async activity => {
  return await AcademicAdministrationActivity.findOneAndRemove(activity);
};

// WORKLOAD METHODS
let globalTarrif = async () => {
  return parameters.global_academic_administration_tarrif;
};

export {
  academicAdministrationActivity,
  academicAdministrationActivities,
  academicAdministrationActivitiesByUser,
  addAcademicAdministrationActivity,
  editAcademicAdministrationActivity,
  deleteAcademicAdministrationActivity,
  globalTarrif
};
