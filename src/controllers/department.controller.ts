import IDepartment from 'interfaces/department.interface';

import Department, {
  default as DepartmentModel
} from '../models/department.model';

export default class DepartmentController {
  constructor() {}

  static async department(departmentId: string) {
    return await DepartmentModel.findOne({ departmentId: departmentId })
      .populate('faculty')
      .populate('hod');
  }
  static async departments() {
    return await Department.find({}).populate('faculty');
  }
  static async createDepartment(department: IDepartment) {
    return await new Department(department).save();
  }
  static async updateDepartment(department: IDepartment) {
    return await DepartmentModel.findOneAndUpdate(
      { departmentId: department.departmentId },
      {
        $set: department
      },
      { upsert: true }
    ).populate('faculty');
  }
  static async deleteDepartment(department: IDepartment) {
    return await DepartmentModel.findOneAndRemove(department).populate(
      'faculty'
    );
  }
}
