import { model } from 'mongoose';
import IGroup from 'interfaces/group.interface';

import Group from '../models/group.model';
import ModuleController from './module.controller';
import IModule from 'interfaces/module.interface';

export default class GroupController {
  public static async group(id: string) {
    return await Group.findOne({ _id: id }).populate('module');
  }
  public static async groups() {
    return await Group.find({}).populate('module');
  }
  public static async groupsByModule(moduleId: string) {
    return await Group.find({ moduleId: moduleId }).populate('module');
  }
  public static async groupTotal(moduleId: string) {
    const groups: IGroup[] = (await this.groupsByModule(moduleId)) as IGroup[];
    let total = 0;
    for (let group of groups) {
      total += group.studentsEnrolled;
    }
    return total;
  }
  public static async remainingStudents(moduleId: string) {
    const module: IModule = (await ModuleController.module(moduleId)) as IModule;
    const groupTotal: number = await this.groupTotal(moduleId);
    const remaining: number = module.studentsEnrolled - groupTotal;
    return remaining;
  }
  public static async groupExists(groupId: string, moduleId: string) {
    const count = await Group.count({ groupId: groupId, moduleId: moduleId });
    if (count !== 0) {
      return true;
    }
    return false;
  }
  public static async createGroup(group: IGroup) {
    return await new Group(group).save();
  }
  public static async updateGroup(group: IGroup) {
    return await Group.findOneAndUpdate(
      {
        _id: group.id
      },
      {
        $set: {
          group
        }
      },
      { upsert: true }
    );
  }
  public static async deleteGroup(group: IGroup) {
    return await Group.findOneAndRemove({ _id: group.id });
  }
}
