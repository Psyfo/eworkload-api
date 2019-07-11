import Department from './../models/department.js';

let department = async departmentId => {
  return await Department.findOne({ departmentId: departmentId }).populate(
    'faculty'
  );
};

let departments = async () => {
  return await Department.find({}).populate('faculty');
};

let addDepartment = async department => {
  const newDepartment = await new Department(department);

  return await newDepartment.save().populate('faculty');
};

let editDepartment = async department => {
  return await Department.findOneAndUpdate(
    { departmentId: department.departmentId },
    {
      $set: department
    },
    { upsert: true }
  ).populate('faculty');
};

let deleteDepartment = async department => {
  return await Department.findOneAndRemove(department).populate('faculty');
};

export {
  department,
  departments,
  addDepartment,
  editDepartment,
  deleteDepartment
};
