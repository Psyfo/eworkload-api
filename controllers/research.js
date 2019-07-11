import ResearchActivity from '../models/research-activity';
import parameters from '../config/parameters';
// import User from '../models/user';
// import Student from '../models/student';
// import parameters from '../config/parameters';

// FI METHODS
let researchActivity = async activityId => {
  return await ResearchActivity.findOne({ activityId: activityId });
};

let researchActivities = async () => {
  return await ResearchActivity.find({});
};

let researchActivitiesByUser = async userId => {
  return await ResearchActivity.find({ userId: userId });
};

let addResearchActivity = async activity => {
  const newResearchActivity = await new ResearchActivity(activity);

  return await newResearchActivity.save();
};

let editResearchActivity = async activity => {
  return await ResearchActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  );
};

let deleteResearchActivity = async activity => {
  return await ResearchActivity.findOneAndRemove(activity);
};

// WORKLOAD METHODS

let globalTarrif = async () => {
  return parameters.global_research_tarrif;
};

export {
  researchActivity,
  researchActivities,
  researchActivitiesByUser,
  addResearchActivity,
  editResearchActivity,
  deleteResearchActivity,
  globalTarrif
};
