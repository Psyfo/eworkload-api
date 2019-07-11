import Faculty from './../models/faculty.js';

let faculty = async facultyId => {
  return await Faculty.findOne({ facultyId: facultyId });
};

let faculties = async () => {
  return await Faculty.find({});
};

let addFaculty = async faculty => {
  const newFaculty = await new Faculty(faculty);

  return await newFaculty.save();
};

let editFaculty = async faculty => {
  return await Faculty.findOneAndUpdate(
    { facultyId: faculty.facultyId },
    {
      $set: faculty
    },
    { upsert: true }
  );
};

let deleteFaculty = async faculty => {
  return await Faculty.findOneAndRemove(faculty);
};

export { faculty, faculties, addFaculty, editFaculty, deleteFaculty };
