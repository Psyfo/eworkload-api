import Enrollment from '../models/enrollment';
import Module from '../models/module';
import User from '../models/user';
import FormalInstructionActivity from '../models/formal-instruction-activity';
import parameters from '../config/parameters';

let year = new Date().getFullYear();

// FI METHODS
let formalInstructionActivity = async activityId => {
  return await FormalInstructionActivity.findOne({ activityId: activityId })
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('duty')
    .populate('module')
    .populate('moderator');
};

let formalInstructionActivities = async () => {
  return await FormalInstructionActivity.find({})
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('duty')
    .populate('module')
    .populate('moderator');
};

let formalInstructionActivitiesByUser = async userId => {
  return await FormalInstructionActivity.find({ userId: userId })
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('duty')
    .populate({
      path: 'module',
      model: 'Module',
      populate: { path: 'block', model: 'Block' }
    })
    .populate('moderator');
};

let addFormalInstructionActivity = async activity => {
  const newFormalInstructionActivity = await new FormalInstructionActivity(
    activity
  );

  return newFormalInstructionActivity.save();
};

let editFormalInstructionActivity = async activity => {
  return await FormalInstructionActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  );
};

let deleteFormalInstructionActivity = async activity => {
  return await FormalInstructionActivity.findOneAndRemove(activity);
};

// WORKLOAD METHODS
let baseContact = async activityId => {
  let activity = await FormalInstructionActivity.findOne({
    activityId: activityId
  })
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('duty')
    .populate('module')
    .populate('moderator');

  let module = await Module.findOne({
    moduleId: activity.moduleId,
    blockId: activity.blockId,
    offeringTypeId: activity.offeringTypeId,
    qualificationId: activity.qualificationId
  })
    .populate('discipline')
    .populate({
      path: 'qualification',
      model: 'Qualification',
      populate: {
        path: 'department',
        model: 'Department',
        populate: {
          path: 'faculty',
          model: 'Faculty'
        }
      }
    })
    .populate('offeringType')
    .populate('block')
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('coordinator')
    .populate('venue');

  let enrollment = await Enrollment.findOne({
    qualificationId: module.qualificationId,
    enrollmentYear: year
  }).populate('qualification');

  let lectureWeeks;
  if (module.blockId === parameters.semester_1 || parameters.semester_1) {
    lectureWeeks = parameters.lecture_weeks_semester;
  } else if (module.blockId === parameters.annual) {
    lectureWeeks = parameters.lecture_weeks_annual;
  }
  let students = 0;

  if (module.studyPeriod === '1') {
    students = enrollment.firstYearEstimated;
  } else {
    students =
      (enrollment.secondYearEstimated + enrollment.thirdYearEstimated) / 2;
  }
  let repeats = Math.round(students / parameters.max_venue_size);
  let baseContact = Math.round(
    ((module.credits / 4) * lectureWeeks * repeats) / module.groupSize
  );

  return baseContact;
};

let coordination = async activityId => {
  let coordination = 0;

  let activity = await FormalInstructionActivity.findOne({
    activityId: activityId
  })
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('duty')
    .populate('module')
    .populate('moderator');
  let module = await Module.findOne({
    moduleId: activity.moduleId,
    blockId: activity.blockId,
    offeringTypeId: activity.offeringTypeId,
    qualificationId: activity.qualificationId
  })
    .populate('discipline')
    .populate({
      path: 'qualification',
      model: 'Qualification',
      populate: {
        path: 'department',
        model: 'Department',
        populate: {
          path: 'faculty',
          model: 'Faculty'
        }
      }
    })
    .populate('offeringType')
    .populate('block')
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('coordinator')
    .populate('venue');
  let enrollment = await Enrollment.findOne({
    qualificationId: module.qualificationId,
    enrollmentYear: year
  }).populate('qualification');

  let students = 0;

  if (module.studyPeriod === '1') {
    students = enrollment.firstYearEstimated;
  } else {
    students =
      (enrollment.secondYearEstimated + enrollment.thirdYearEstimated) / 2;
  }

  if (activity.userId === module.coordinatorId) {
    coordination = Math.round(((students - 100) / 40) * (module.credits / 10));
  }

  return coordination;
};

let studentSupport = async activityId => {
  let studentSupport = 0;
  let activity = await FormalInstructionActivity.findOne({
    activityId: activityId
  })
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('duty')
    .populate('module')
    .populate('moderator');
  let module = await Module.findOne({
    moduleId: activity.moduleId,
    blockId: activity.blockId,
    offeringTypeId: activity.offeringTypeId,
    qualificationId: activity.qualificationId
  })
    .populate('discipline')
    .populate({
      path: 'qualification',
      model: 'Qualification',
      populate: {
        path: 'department',
        model: 'Department',
        populate: {
          path: 'faculty',
          model: 'Faculty'
        }
      }
    })
    .populate('offeringType')
    .populate('block')
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('coordinator')
    .populate('venue');
  let enrollment = await Enrollment.findOne({
    qualificationId: module.qualificationId,
    enrollmentYear: year
  }).populate('qualification');

  let students = 0;

  if (module.studyPeriod === '1') {
    students = enrollment.firstYearEstimated;
  } else {
    students =
      (enrollment.secondYearEstimated + enrollment.thirdYearEstimated) / 2;
  }
  let lectureWeeks;
  if (module.blockId === parameters.semester_1 || parameters.semester_1) {
    lectureWeeks = parameters.lecture_weeks_semester;
  } else if (module.blockId === parameters.annual) {
    lectureWeeks = parameters.lecture_weeks_annual;
  }

  studentSupport = Math.round((0.1 * students * module.credits) / lectureWeeks);
  return studentSupport;
};

let preparationTime = async activityId => {
  let preparationTime = 0;
  let activity = await FormalInstructionActivity.findOne({
    activityId: activityId
  })
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('duty')
    .populate('module')
    .populate('moderator');
  let module = await Module.findOne({
    moduleId: activity.moduleId,
    blockId: activity.blockId,
    offeringTypeId: activity.offeringTypeId,
    qualificationId: activity.qualificationId
  })
    .populate('discipline')
    .populate({
      path: 'qualification',
      model: 'Qualification',
      populate: {
        path: 'department',
        model: 'Department',
        populate: {
          path: 'faculty',
          model: 'Faculty'
        }
      }
    })
    .populate('offeringType')
    .populate('block')
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('coordinator')
    .populate('venue');
  let enrollment = await Enrollment.findOne({
    qualificationId: module.qualificationId,
    enrollmentYear: year
  }).populate('qualification');

  let students = 0;

  if (module.studyPeriod === '1') {
    students = enrollment.firstYearEstimated;
  } else {
    students =
      (enrollment.secondYearEstimated + enrollment.thirdYearEstimated) / 2;
  }

  let repeats = Math.round(students / parameters.max_venue_size);

  let base = await baseContact(activity.activityId);
  preparationTime = Math.round(
    (base / repeats) * (parseInt(module.nqfLevel) - 3)
  );
  return preparationTime;
};

let assessmentSetting = async activityId => {
  let assessmentSetting = 0;
  let activity = await FormalInstructionActivity.findOne({
    activityId: activityId
  })
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('duty')
    .populate('module')
    .populate('moderator');
  let module = await Module.findOne({
    moduleId: activity.moduleId,
    blockId: activity.blockId,
    offeringTypeId: activity.offeringTypeId,
    qualificationId: activity.qualificationId
  })
    .populate('discipline')
    .populate({
      path: 'qualification',
      model: 'Qualification',
      populate: {
        path: 'department',
        model: 'Department',
        populate: {
          path: 'faculty',
          model: 'Faculty'
        }
      }
    })
    .populate('offeringType')
    .populate('block')
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('coordinator')
    .populate('venue');

  let lectureWeeks;
  if (module.blockId === parameters.semester_1 || parameters.semester_1) {
    lectureWeeks = parameters.lecture_weeks_semester;
  } else if (module.blockId === parameters.annual) {
    lectureWeeks = parameters.lecture_weeks_annual;
  }

  assessmentSetting = Math.round(
    ((10 * module.credits) / lectureWeeks) * (parseInt(module.nqfLevel) - 3)
  );
  return assessmentSetting;
};

let examMarking = async activityId => {
  let examMarking = 0;
  let activity = await FormalInstructionActivity.findOne({
    activityId: activityId
  })
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('duty')
    .populate('module')
    .populate('moderator');
  let module = await Module.findOne({
    moduleId: activity.moduleId,
    blockId: activity.blockId,
    offeringTypeId: activity.offeringTypeId,
    qualificationId: activity.qualificationId
  })
    .populate('discipline')
    .populate({
      path: 'qualification',
      model: 'Qualification',
      populate: {
        path: 'department',
        model: 'Department',
        populate: {
          path: 'faculty',
          model: 'Faculty'
        }
      }
    })
    .populate('offeringType')
    .populate('block')
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('coordinator')
    .populate('venue');
  let enrollment = await Enrollment.findOne({
    qualificationId: module.qualificationId,
    enrollmentYear: year
  }).populate('qualification');

  let students = 0;

  if (module.studyPeriod === '1') {
    students = enrollment.firstYearEstimated;
  } else {
    students =
      (enrollment.secondYearEstimated + enrollment.thirdYearEstimated) / 2;
  }
  let lectureWeeks;
  if (module.blockId === parameters.semester_1 || parameters.semester_1) {
    lectureWeeks = parameters.lecture_weeks_semester;
  } else if (module.blockId === parameters.annual) {
    lectureWeeks = parameters.lecture_weeks_annual;
  }
  // let repeats = Math.round(students / parameters.max_venue_size);
  examMarking = Math.round(
    0.25 * students * (module.credits / lectureWeeks) * (module.nqfLevel - 5)
  );
  return examMarking;
};

let courseworkMarking = async activityId => {
  let courseworkMarking = 0;
  let activity = await FormalInstructionActivity.findOne({
    activityId: activityId
  })
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('duty')
    .populate('module')
    .populate('moderator');
  let module = await Module.findOne({
    moduleId: activity.moduleId,
    blockId: activity.blockId,
    offeringTypeId: activity.offeringTypeId,
    qualificationId: activity.qualificationId
  })
    .populate('discipline')
    .populate({
      path: 'qualification',
      model: 'Qualification',
      populate: {
        path: 'department',
        model: 'Department',
        populate: {
          path: 'faculty',
          model: 'Faculty'
        }
      }
    })
    .populate('offeringType')
    .populate('block')
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('coordinator')
    .populate('venue');
  let enrollment = await Enrollment.findOne({
    qualificationId: module.qualificationId,
    enrollmentYear: year
  }).populate('qualification');

  let students = 0;

  if (module.studyPeriod === '1') {
    students = enrollment.firstYearEstimated;
  } else {
    students =
      (enrollment.secondYearEstimated + enrollment.thirdYearEstimated) / 2;
  }
  let lectureWeeks;
  if (module.blockId === parameters.semester_1 || parameters.semester_1) {
    lectureWeeks = parameters.lecture_weeks_semester;
  } else if (module.blockId === parameters.annual) {
    lectureWeeks = parameters.lecture_weeks_annual;
  }
  // let repeats = Math.round(students / parameters.max_venue_size);

  courseworkMarking = Math.round(
    0.5 * students * (module.credits / lectureWeeks)
  );
  return courseworkMarking;
};

let feedback = async activityId => {
  let feedback = 0;
  let activity = await FormalInstructionActivity.findOne({
    activityId: activityId
  })
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('duty')
    .populate('module')
    .populate('moderator');
  let module = await Module.findOne({
    moduleId: activity.moduleId,
    blockId: activity.blockId,
    offeringTypeId: activity.offeringTypeId,
    qualificationId: activity.qualificationId
  })
    .populate('discipline')
    .populate({
      path: 'qualification',
      model: 'Qualification',
      populate: {
        path: 'department',
        model: 'Department',
        populate: {
          path: 'faculty',
          model: 'Faculty'
        }
      }
    })
    .populate('offeringType')
    .populate('block')
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('coordinator')
    .populate('venue');
  let enrollment = await Enrollment.findOne({
    qualificationId: module.qualificationId,
    enrollmentYear: year
  }).populate('qualification');

  let students = 0;

  if (module.studyPeriod === '1') {
    students = enrollment.firstYearEstimated;
  } else {
    students =
      (enrollment.secondYearEstimated + enrollment.thirdYearEstimated) / 2;
  }
  let lectureWeeks;
  if (module.blockId === parameters.semester_1 || parameters.semester_1) {
    lectureWeeks = parameters.lecture_weeks_semester;
  } else if (module.blockId === parameters.annual) {
    lectureWeeks = parameters.lecture_weeks_annual;
  }
  // let repeats = Math.round(students / parameters.max_venue_size);

  feedback = Math.round(1 * students * (module.credits / lectureWeeks));
  return feedback;
};

let formativeAssessment = async activityId => {
  let formativeAssessment = 0;
  let activity = await FormalInstructionActivity.findOne({
    activityId: activityId
  })
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('duty')
    .populate('module')
    .populate('moderator');
  let module = await Module.findOne({
    moduleId: activity.moduleId,
    blockId: activity.blockId,
    offeringTypeId: activity.offeringTypeId,
    qualificationId: activity.qualificationId
  })
    .populate('discipline')
    .populate({
      path: 'qualification',
      model: 'Qualification',
      populate: {
        path: 'department',
        model: 'Department',
        populate: {
          path: 'faculty',
          model: 'Faculty'
        }
      }
    })
    .populate('offeringType')
    .populate('block')
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('coordinator')
    .populate('venue');
  let enrollment = await Enrollment.findOne({
    qualificationId: module.qualificationId,
    enrollmentYear: year
  }).populate('qualification');

  let students = 0;

  if (module.studyPeriod === '1') {
    students = enrollment.firstYearEstimated;
  } else {
    students =
      (enrollment.secondYearEstimated + enrollment.thirdYearEstimated) / 2;
  }
  let lectureWeeks;
  if (module.blockId === parameters.semester_1 || parameters.semester_1) {
    lectureWeeks = parameters.lecture_weeks_semester;
  } else if (module.blockId === parameters.annual) {
    lectureWeeks = parameters.lecture_weeks_annual;
  }
  // let repeats = Math.round(students / parameters.max_venue_size);

  formativeAssessment = Math.round(
    0.4 * students * (module.credits / lectureWeeks)
  );
  return formativeAssessment;
};

let moderation = async activityId => {
  let moderation = 0;
  let activity = await FormalInstructionActivity.findOne({
    activityId: activityId
  })
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('duty')
    .populate('module')
    .populate('moderator');
  let module = await Module.findOne({
    moduleId: activity.moduleId,
    blockId: activity.blockId,
    offeringTypeId: activity.offeringTypeId,
    qualificationId: activity.qualificationId
  })
    .populate('discipline')
    .populate({
      path: 'qualification',
      model: 'Qualification',
      populate: {
        path: 'department',
        model: 'Department',
        populate: {
          path: 'faculty',
          model: 'Faculty'
        }
      }
    })
    .populate('offeringType')
    .populate('block')
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('coordinator')
    .populate('venue');
  let enrollment = await Enrollment.findOne({
    qualificationId: module.qualificationId,
    enrollmentYear: year
  }).populate('qualification');

  let students = 0;

  if (module.studyPeriod === '1') {
    students = enrollment.firstYearEstimated;
  } else {
    students =
      (enrollment.secondYearEstimated + enrollment.thirdYearEstimated) / 2;
  }
  let lectureWeeks;
  if (module.blockId === parameters.semester_1 || parameters.semester_1) {
    lectureWeeks = parameters.lecture_weeks_semester;
  } else if (module.blockId === parameters.annual) {
    lectureWeeks = parameters.lecture_weeks_annual;
  }
  // let repeats = Math.round(students / parameters.max_venue_size);

  if (activity.userId === module.moderatorId) {
    moderation = Math.round((0.1 * students * module.credits) / lectureWeeks);
  }
  return moderation;
};

let total = async activityId => {
  return Math.round(
    (await baseContact(activityId)) +
      (await coordination(activityId)) +
      (await studentSupport(activityId)) +
      (await preparationTime(activityId)) +
      (await assessmentSetting(activityId)) +
      (await examMarking(activityId)) +
      (await courseworkMarking(activityId)) +
      (await feedback(activityId)) +
      (await formativeAssessment(activityId)) +
      (await moderation(activityId))
  );
};

let other = async activityId => {
  return Math.round(
    (await coordination(activityId)) +
      (await studentSupport(activityId)) +
      (await preparationTime(activityId)) +
      (await assessmentSetting(activityId)) +
      (await examMarking(activityId)) +
      (await courseworkMarking(activityId)) +
      (await feedback(activityId)) +
      (await formativeAssessment(activityId)) +
      (await moderation(activityId))
  );
};

let sumTotal = async userId => {
  let activities = await FormalInstructionActivity.find({ userId: userId })
    .populate('user')
    .populate('module')
    .populate('duty')
    .populate('block')
    .populate('qualification')
    .populate('offeringType');
  let sum = 0;
  for (let activity of activities) {
    sum += await total(activity.activityId);
    console.log('Sum: ', sum);
  }

  return Math.round(sum);
};

let teachingFocus = async userId => {
  let user = await User.findOne({ userId: userId })
    .populate('discipline')
    .populate('position')
    .populate('workFocus');

  let teachingFocus = Math.round(
    (user.workFocus.teachingRatio / 100) * parameters.annual_total_hours
  );

  return teachingFocus;
};

let percentageOfFocus = async activityId => {
  let activity = await FormalInstructionActivity.findOne({
    activityId: activityId
  })
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('duty')
    .populate('module')
    .populate('moderator');

  let user = await User.findOne({ userId: activity.userId })
    .populate('discipline')
    .populate('position')
    .populate('workFocus');

  let activityHours = await total(activityId);
  let teachingHours = await teachingFocus(user.userId);
  let percentageOfFormalInstruction = Math.round(
    (activityHours / teachingHours) * 100
  );
  return percentageOfFormalInstruction;
};

let percentageOfTotal = async activityId => {
  let activityHours = await total(activityId);

  let totalHours = parameters.annual_total_hours;
  let percentageOfFormalInstruction = Math.round(
    (activityHours / totalHours) * 100
  );
  console.log('Percentage: ', percentageOfFormalInstruction);

  return percentageOfFormalInstruction;
};

let sumPercentageOfTotal = async userId => {
  let activities = await FormalInstructionActivity.find({ userId: userId })
    .populate('user')
    .populate('module')
    .populate('duty')
    .populate('block')
    .populate('qualification')
    .populate('offeringType');
  let sum = 0;
  for (let activity of activities) {
    sum += await percentageOfTotal(activity.activityId);
    console.log('Sum: ', sum);
  }

  return Math.round(sum);
};

let studentsEnrolled = async activityId => {
  let students = 0;
  let year = new Date().getFullYear().toString();
  let activity = await formalInstructionActivity(activityId);
  let module = await Module.findOne({ moduleId: activity.moduleId });

  let enrollment = await Enrollment.findOne({
    qualificationId: activity.qualificationId,
    enrollmentYear: year
  });

  if (module.studyPeriod === '1') {
    students = enrollment.firstYearEstimated;
  } else if (module.studyPeriod === '2') {
    students = enrollment.secondYearEstimated;
  } else if (module.studyPeriod === '3') {
    students = enrollment.thirdYearEstimated;
  }

  return students;
};

let hemis = async userId => {
  let hemis = [];
  let activities = await formalInstructionActivitiesByUser(userId);

  for (let activity of activities) {
    let baseContactVar = await baseContact(activity.activityId);
    let otherVar = await other(activity.activityId);
    let totalVar = await total(activity.activityId);
    let sumTotalVar = await sumTotal(activity.userId);
    let percentageOfTotalVar = await percentageOfTotal(activity.activityId);
    let studentsVar = await studentsEnrolled(activity.activityId);

    hemis.push({
      activity: activity,
      baseContact: baseContactVar,
      other: otherVar,
      total: totalVar,
      sumTotal: sumTotalVar,
      percentageOfTotal: percentageOfTotalVar,
      studentsEnrolled: studentsVar
    });
  }
  return hemis;
};
export {
  formalInstructionActivity,
  formalInstructionActivities,
  formalInstructionActivitiesByUser,
  addFormalInstructionActivity,
  editFormalInstructionActivity,
  deleteFormalInstructionActivity,
  baseContact,
  coordination,
  studentSupport,
  preparationTime,
  assessmentSetting,
  examMarking,
  courseworkMarking,
  feedback,
  formativeAssessment,
  moderation,
  total,
  other,
  sumTotal,
  teachingFocus,
  percentageOfFocus,
  percentageOfTotal,
  sumPercentageOfTotal,
  studentsEnrolled,
  hemis
};
