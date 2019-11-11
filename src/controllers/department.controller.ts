import { default as DepartmentModel } from '../models/department.model';

let department = async (departmentId: String) => {
  return await DepartmentModel.findOne({ departmentId: departmentId })
    .populate('faculty')
    .populate('hod');
};
let departments = async () => {
  return await DepartmentModel.find({})
    .populate('faculty')
    .populate('hod');
};
let addDepartment = async (department: any) => {
  const newDepartment = await new DepartmentModel(department);

  return await newDepartment.save();
};
let editDepartment = async (department: any) => {
  return await DepartmentModel.findOneAndUpdate(
    { departmentId: department.departmentId },
    {
      $set: department
    },
    { upsert: true }
  )
    .populate('faculty')
    .populate('hod');
};
let deleteDepartment = async (department: any) => {
  return await DepartmentModel.findOneAndRemove(department)
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
