import Department from './../models/department.js';

let department = async departmentId => {
  return await Department.findOne({ departmentId: departmentId })
    .populate('faculty')
    .populate('hod');
};

let departments = async () => {
  return await Department.find({})
    .populate('faculty')
    .populate('hod');
};

let addDepartment = async department => {
  const newDepartment = await new Department(department);

  return await newDepartment
    .save()
    .populate('faculty')
    .populate('hod');
};

let editDepartment = async department => {
  return await Department.findOneAndUpdate(
    { departmentId: department.departmentId },
    {
      $set: department
    },
    { upsert: true }
  )
    .populate('faculty')
    .populate('hod');
};

let deleteDepartment = async department => {
  return await Department.findOneAndRemove(department)
    .populate('faculty')
    .populate('hod');
};

export {
  department,
  departments,
  addDepartment,
  editDepartment,
  deleteDepartment
};
