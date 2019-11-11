import Faculty from '../models/faculty.model';

let faculty = async (facultyId: string) => {
  return await Faculty.findOne({ facultyId: facultyId });
};
let faculties = async () => {
  return await Faculty.find({});
};
let addFaculty = async (faculty: any) => {
  const newFaculty = await new Faculty(faculty);

  return await newFaculty.save();
};
let editFaculty = async (faculty: any) => {
  return await Faculty.findOneAndUpdate(
    { facultyId: faculty.facultyId },
    {
      $set: faculty
    },
    { upsert: true }
  );
};
let deleteFaculty = async (faculty: any) => {
  return await Faculty.findOneAndRemove(faculty);
};

export { faculty, faculties, addFaculty, editFaculty, deleteFaculty };
