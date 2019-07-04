import Enrollment from '../models/enrollment';
import Module from '../models/module';
import parameters from './../config/parameters';

let year = new Date().getFullYear();

export let calcTeachingPercentage = async (
  userId,
  moduleId,
  blockId,
  offeringTypeId,
  qualificationId
) => {
  let calcTeachingPercentage = await Math.round(
    (calcTeachingTotal(
      userId,
      moduleId,
      blockId,
      offeringTypeId,
      qualificationId
    ) /
      parameters.annual_total_hours) *
      100
  );
  console.log('Teaching Percentage', calcTeachingPercentage);

  return calcTeachingPercentage;
};

export let calcTeachingTotal = async (
  userId,
  moduleId,
  blockId,
  offeringTypeId,
  qualificationId
) => {
  let base = await calcBaseContact(
    userId,
    moduleId,
    blockId,
    offeringTypeId,
    qualificationId
  );
  let coordination = await calcCoordination(
    userId,
    moduleId,
    blockId,
    offeringTypeId,
    qualificationId
  );
  let studentSupport = await calcStudentSupport(
    userId,
    moduleId,
    blockId,
    offeringTypeId,
    qualificationId
  );
  let preparationTime = await calcPreparationTime(
    userId,
    moduleId,
    blockId,
    offeringTypeId,
    qualificationId
  );
  let assessmentSetting = await calcAssessmentSetting(
    userId,
    moduleId,
    blockId,
    offeringTypeId,
    qualificationId
  );
  let examMarking = await calcExamMarking(
    userId,
    moduleId,
    blockId,
    offeringTypeId,
    qualificationId
  );
  let courseworkMarking = await calcCourseworkMarking(
    userId,
    moduleId,
    blockId,
    offeringTypeId,
    qualificationId
  );
  let feedback = await calcFeedback(
    userId,
    moduleId,
    blockId,
    offeringTypeId,
    qualificationId
  );
  let formativeAssessment = await calcFormativeAssessment(
    userId,
    moduleId,
    blockId,
    offeringTypeId,
    qualificationId
  );
  let moderation = await calcModeration(
    userId,
    moduleId,
    blockId,
    offeringTypeId,
    qualificationId
  );
  let total =
    base +
    coordination +
    studentSupport +
    preparationTime +
    assessmentSetting +
    examMarking +
    courseworkMarking +
    feedback +
    formativeAssessment +
    moderation;

  console.log(`Calculated Base Contact hours:${base} hours`);
  console.log(`Calculated Coordination hours: ${coordination} hours`);
  console.log(`Calculated Student Support hours:${studentSupport} hours`);
  console.log(`Calculated Preparation Time hours: ${preparationTime} hours`);
  console.log(
    `Calculated Assessment Setting hours: ${assessmentSetting} hours`
  );
  console.log(`Calculated Exam Marking hours: ${examMarking} hours`);
  console.log(
    `Calculated Coursework Marking hours: ${courseworkMarking} hours`
  );
  console.log(`Calculated Feedback hours: ${feedback} hours`);
  console.log(
    `Calculated Formative Assessment hours: ${formativeAssessment} hours`
  );
  console.log(`Calculated Moderation hours: ${moderation} hours`);

  console.log(`Calculated Total hours: ${total} hours`);
  return total;
};

export let calcTeachingOther = async (
  userId,
  moduleId,
  blockId,
  offeringTypeId,
  qualificationId
) => {
  let coordination = await calcCoordination(
    userId,
    moduleId,
    blockId,
    offeringTypeId,
    qualificationId
  );
  let studentSupport = await calcStudentSupport(
    userId,
    moduleId,
    blockId,
    offeringTypeId,
    qualificationId
  );
  let preparationTime = await calcPreparationTime(
    userId,
    moduleId,
    blockId,
    offeringTypeId,
    qualificationId
  );
  let assessmentSetting = await calcAssessmentSetting(
    userId,
    moduleId,
    blockId,
    offeringTypeId,
    qualificationId
  );
  let examMarking = await calcExamMarking(
    userId,
    moduleId,
    blockId,
    offeringTypeId,
    qualificationId
  );
  let courseworkMarking = await calcCourseworkMarking(
    userId,
    moduleId,
    blockId,
    offeringTypeId,
    qualificationId
  );
  let feedback = await calcFeedback(
    userId,
    moduleId,
    blockId,
    offeringTypeId,
    qualificationId
  );
  let formativeAssessment = await calcFormativeAssessment(
    userId,
    moduleId,
    blockId,
    offeringTypeId,
    qualificationId
  );
  let moderation = await calcModeration(
    userId,
    moduleId,
    blockId,
    offeringTypeId,
    qualificationId
  );
  let other =
    coordination +
    studentSupport +
    preparationTime +
    assessmentSetting +
    examMarking +
    courseworkMarking +
    feedback +
    formativeAssessment +
    moderation;

  console.log(`Calculated Other hours: ${other} hours`);
  return other;
};

export let calcBaseContact = async (
  userId,
  moduleId,
  blockId,
  offeringTypeId,
  qualificationId
) => {
  let module = await Module.findOne({
    moduleId: moduleId,
    blockId: blockId,
    offeringTypeId: offeringTypeId,
    qualificationId: qualificationId,
  })
    .then(module => module)
    .catch(err => err);
  let enrollment = await Enrollment.findOne({
    qualificationId: module.qualificationId,
    enrollmentYear: year,
  })
    .then(enrollment => enrollment)
    .catch(err => err);

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

export let calcCoordination = async (
  userId,
  moduleId,
  blockId,
  offeringTypeId,
  qualificationId
) => {
  let coordination = 0;

  let module = await Module.findOne({
    moduleId: moduleId,
    blockId: blockId,
    offeringTypeId: offeringTypeId,
    qualificationId: qualificationId,
  })
    .then(module => module)
    .catch(err => err);
  let enrollment = await Enrollment.findOne({
    qualificationId: module.qualificationId,
    enrollmentYear: year,
  })
    .then(enrollment => enrollment)
    .catch(err => err);

  let students = 0;

  if (module.studyPeriod === '1') {
    students = enrollment.firstYearEstimated;
  } else {
    students =
      (enrollment.secondYearEstimated + enrollment.thirdYearEstimated) / 2;
  }

  if (userId === module.coordinatorId) {
    coordination = Math.round(((students - 100) / 40) * (module.credits / 10));
  }

  return coordination;
};

export let calcStudentSupport = async (
  userId,
  moduleId,
  blockId,
  offeringTypeId,
  qualificationId
) => {
  let studentSupport = 0;
  let module = await Module.findOne({
    moduleId: moduleId,
    blockId: blockId,
    offeringTypeId: offeringTypeId,
    qualificationId: qualificationId,
  })
    .then(module => module)
    .catch(err => err);
  let enrollment = await Enrollment.findOne({
    qualificationId: module.qualificationId,
    enrollmentYear: year,
  })
    .then(enrollment => enrollment)
    .catch(err => err);

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

export let calcPreparationTime = async (
  userId,
  moduleId,
  blockId,
  offeringTypeId,
  qualificationId
) => {
  let preparationTime = 0;
  let module = await Module.findOne({
    moduleId: moduleId,
    blockId: blockId,
    offeringTypeId: offeringTypeId,
    qualificationId: qualificationId,
  })
    .then(module => module)
    .catch(err => err);
  let enrollment = await Enrollment.findOne({
    qualificationId: module.qualificationId,
    enrollmentYear: year,
  })
    .then(enrollment => enrollment)
    .catch(err => err);

  let students = 0;

  if (module.studyPeriod === '1') {
    students = enrollment.firstYearEstimated;
  } else {
    students =
      (enrollment.secondYearEstimated + enrollment.thirdYearEstimated) / 2;
  }

  let repeats = Math.round(students / parameters.max_venue_size);

  let base = await calcBaseContact(
    userId,
    moduleId,
    blockId,
    offeringTypeId,
    qualificationId
  );
  preparationTime = Math.round(
    (base / repeats) * (parseInt(module.nqfLevel) - 3)
  );
  return preparationTime;
};

export let calcAssessmentSetting = async (
  userId,
  moduleId,
  blockId,
  offeringTypeId,
  qualificationId
) => {
  let assessmentSetting = 0;
  let module = await Module.findOne({
    moduleId: moduleId,
    blockId: blockId,
    offeringTypeId: offeringTypeId,
    qualificationId: qualificationId,
  })
    .then(module => module)
    .catch(err => err);

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

export let calcExamMarking = async (
  userId,
  moduleId,
  blockId,
  offeringTypeId,
  qualificationId
) => {
  let examMarking = 0;
  let module = await Module.findOne({
    moduleId: moduleId,
    blockId: blockId,
    offeringTypeId: offeringTypeId,
    qualificationId: qualificationId,
  })
    .then(module => module)
    .catch(err => err);
  let enrollment = await Enrollment.findOne({
    qualificationId: module.qualificationId,
    enrollmentYear: year,
  })
    .then(enrollment => enrollment)
    .catch(err => err);

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
  let repeats = Math.round(students / parameters.max_venue_size);
  examMarking = Math.round(
    0.25 * students * (module.credits / lectureWeeks) * (module.nqfLevel - 5)
  );
  return examMarking;
};

export let calcCourseworkMarking = async (
  userId,
  moduleId,
  blockId,
  offeringTypeId,
  qualificationId
) => {
  let courseworkMarking = 0;
  let module = await Module.findOne({
    moduleId: moduleId,
    blockId: blockId,
    offeringTypeId: offeringTypeId,
    qualificationId: qualificationId,
  })
    .then(module => module)
    .catch(err => err);
  let enrollment = await Enrollment.findOne({
    qualificationId: module.qualificationId,
    enrollmentYear: year,
  })
    .then(enrollment => enrollment)
    .catch(err => err);

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
  let repeats = Math.round(students / parameters.max_venue_size);

  courseworkMarking = Math.round(
    0.5 * students * (module.credits / lectureWeeks)
  );
  return courseworkMarking;
};

export let calcFeedback = async (
  userId,
  moduleId,
  blockId,
  offeringTypeId,
  qualificationId
) => {
  let feedback = 0;
  let module = await Module.findOne({
    moduleId: moduleId,
    blockId: blockId,
    offeringTypeId: offeringTypeId,
    qualificationId: qualificationId,
  })
    .then(module => module)
    .catch(err => err);
  let enrollment = await Enrollment.findOne({
    qualificationId: module.qualificationId,
    enrollmentYear: year,
  })
    .then(enrollment => enrollment)
    .catch(err => err);

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
  let repeats = Math.round(students / parameters.max_venue_size);

  feedback = Math.round(1 * students * (module.credits / lectureWeeks));
  return feedback;
};

export let calcFormativeAssessment = async (
  userId,
  moduleId,
  blockId,
  offeringTypeId,
  qualificationId
) => {
  let formativeAssessment = 0;
  let module = await Module.findOne({
    moduleId: moduleId,
    blockId: blockId,
    offeringTypeId: offeringTypeId,
    qualificationId: qualificationId,
  })
    .then(module => module)
    .catch(err => err);
  let enrollment = await Enrollment.findOne({
    qualificationId: module.qualificationId,
    enrollmentYear: year,
  })
    .then(enrollment => enrollment)
    .catch(err => err);

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
  let repeats = Math.round(students / parameters.max_venue_size);

  formativeAssessment = Math.round(
    0.4 * students * (module.credits / lectureWeeks)
  );
  return formativeAssessment;
};

export let calcModeration = async (
  userId,
  moduleId,
  blockId,
  offeringTypeId,
  qualificationId
) => {
  let moderation = 0;
  let module = await Module.findOne({
    moduleId: moduleId,
    blockId: blockId,
    offeringTypeId: offeringTypeId,
    qualificationId: qualificationId,
  })
    .then(module => module)
    .catch(err => err);
  let enrollment = await Enrollment.findOne({
    qualificationId: module.qualificationId,
    enrollmentYear: year,
  })
    .then(enrollment => enrollment)
    .catch(err => err);

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
  let repeats = Math.round(students / parameters.max_venue_size);

  if (userId === module.moderatorId) {
    moderation = Math.round((0.1 * students * module.credits) / lectureWeeks);
  }
  return moderation;
};
