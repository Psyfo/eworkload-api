import IGroup from 'interfaces/group.interface';
import IModule from 'interfaces/module.interface';
import uuidv4 from 'uuid/v4';

import GroupController from '../controllers/group.controller';
import Module from '../models/module.model';
import FormalInstructionActivityController from './activity/formal-instruction-activity.controller';
import FormalInstructionActivity from './../models/activity/formal-instruction-activity.model';

export default class ModuleController {
  public static async module(id: String) {
    return await Module.findOne({
      _id: id
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
      .populate('venue')
      .populate('lectured-by');
  }
  public static async modules() {
    return await Module.find({})
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
      .populate('venue')
      .populate('lectured-by');
  }
  public static async modulesByDiscipline(disciplineIds: string[]) {
    return await Module.find({ disciplineId: { $in: disciplineIds } })
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
      .populate('venue')
      .populate('lectured-by');
  }
  public static async modulesByCoordinator(coordinatorId: string) {
    return await Module.find({ coordinatorId: coordinatorId })
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
      .populate('venue')
      .populate('lectured-by');
  }
  public static async modulesByDepartment(departmentId: string) {
    return await Module.find({ departmentId: departmentId })
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
      .populate('venue')
      .populate('lectured-by');
  }
  public static async modulesByStack(stackId: string) {
    return await Module.find({ stackId: stackId })
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
      .populate('venue')
      .populate('lectured-by');
  }
  public static async createModule(module: IModule) {
    return await new Module(module).save();
  }
  public static async createModules(modules: IModule[]) {
    let newModules: IModule[] = [];
    modules.forEach(module => {
      const newModule = new Module(module);
      newModules.push(<IModule>newModule);
    });

    let result = await Module.insertMany(newModules, { ordered: false });

    console.log('Bulk upload complete');
    return result;
  }
  public static async updateModule(module: IModule) {
    return await Module.findOneAndUpdate(
      {
        _id: module.id
      },
      {
        $set: module
      },
      { upsert: true }
    )
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
      .populate('venue')
      .populate('lectured-by');
  }
  public static async deleteModule(module: IModule) {
    return await Module.findOneAndRemove(module)
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
      .populate('venue')
      .populate('lectured-by');
  }
  public static async stackModules(ids: string[]) {
    const stackId: string = uuidv4();

    const updatedModules: any = ids.map(async (id: string) => {
      return await Module.findOneAndUpdate(
        {
          _Id: id
        },
        {
          $set: {
            stackId: stackId
          }
        },
        { upsert: true }
      );
    });

    if (updatedModules === null) {
      throw new Error('No updated modules returned');
    }
    return updatedModules;
  }
  public static async addModuleToStack(id: string, stackId: string) {
    return await Module.findOneAndUpdate(
      {
        _id: id
      },
      {
        $set: {
          stackId: stackId
        }
      },
      { upsert: true }
    );
  }
  public static async stackedWith(id: string, stackId: string) {
    return await Module.find({ _id: { $ne: id }, stackId: stackId });
  }
  public static async unstackedModules() {
    const modules: IModule[] = (await this.modules()) as IModule[];
    let unstackedModules: IModule[] = [];
    for (let module of modules) {
      const count = await Module.countDocuments({ stackId: module.stackId });
      if (count > 0) {
        unstackedModules.push(module);
      }
    }
    return unstackedModules;
  }
  public static async unstackModule(id: string) {
    return await Module.findOneAndUpdate({ _id: id }, { $set: { stackId: uuidv4 } }, { upsert: true });
  }
  public static async defaultGroupsAllModules() {
    const modules: IModule[] = (await this.modules()) as IModule[];
    await modules.map(async module => {
      // Check for group
      const group = await GroupController.groupsByModule(module.id);
      console.log('Group?: ', group);

      if (!group.length) {
        // Add default if not group
        const newGroup: IGroup = {
          groupId: 'A',
          moduleId: module.id,
          studentsEnrolled: module.studentsEnrolled,
          modularity: 1
        } as IGroup;
        // save group to db
        await GroupController.createGroup(newGroup);
      }
    });
    return 'All modules assigned a group';
  }
  public static async resetStacks() {
    const modules: IModule[] = (await Module.find().orFail()) as IModule[];

    await modules.map(async (module: IModule) => {
      await Module.findOneAndUpdate(
        {
          _id: module.id
        },
        {
          $set: {
            stackId: uuidv4()
          }
        },
        { upsert: true }
      );
    });
    return 'All module stacks reset';
  }
  public static async resetEnrollments() {
    const modules: IModule[] = (await Module.find().orFail()) as IModule[];

    await Module.update({}, { $rename: { enrolled: 'studentsEnrolled' } }, { multi: true }, function(err, blocks) {
      if (err) {
        throw err;
      }
      console.log('Module enrollments changed to studentsEnrolled');
    });
    return 'All module have been given enrollments';
  }
}
