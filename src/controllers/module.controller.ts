import IModule from 'interfaces/module.interface';
import uuidv4 from 'uuid/v4';

import Module from '../models/module.model';

export default class ModuleController {
  public static async module(
    moduleId: string,
    blockId: string,
    offeringTypeId: string,
    qualificationId: string
  ) {
    return await Module.findOne({
      moduleId: moduleId,
      blockId: blockId,
      offeringTypeId: offeringTypeId,
      qualificationId: qualificationId
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
      .populate('venue')
      .populate('lecturers');
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
      .populate('user')
      .populate('coordinator')
      .populate('moderator')
      .populate('coordinator')
      .populate('venue')
      .populate('lecturers');
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
      .populate('user')
      .populate('coordinator')
      .populate('moderator')
      .populate('coordinator')
      .populate('venue')
      .populate('lecturers');
  }
  public static async modulesByUnassigned() {
    return await Module.find({ userId: null })
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
      .populate('venue')
      .populate('lecturers');
  }
  public static async modulesByAssigned() {
    return await Module.find({ userId: { $nin: [null, ''] } })
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
      .populate('venue')
      .populate('lecturers');
  }
  public static async modulesByUser(userId: string) {
    return await Module.find({ userId: userId })
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
      .populate('venue')
      .populate('lecturers');
  }
  public static async modulesByModerator(moderatorId: string) {
    return await Module.find({ moderatorId: moderatorId })
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
      .populate('venue')
      .populate('lecturers');
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
      .populate('user')
      .populate('coordinator')
      .populate('moderator')
      .populate('coordinator')
      .populate('venue')
      .populate('lecturers');
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
      .populate('user')
      .populate('coordinator')
      .populate('moderator')
      .populate('coordinator')
      .populate('venue')
      .populate('lecturers');
  }
  public static async modulesByUnassignedAndDiscipline(
    userId: string,
    disciplineIds: string[]
  ) {
    return await Module.find({
      disciplineId: { $in: disciplineIds }
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
      .populate('venue')
      .populate('lecturers');
  }
  public static async createModule(module: any) {
    const newModule = await new Module(module);

    return await newModule.save();
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
  public static async updateModule(module: any) {
    return await Module.findOneAndUpdate(
      {
        moduleId: module.moduleId,
        blockId: module.blockId,
        offeringTypeId: module.offeringTypeId,
        qualificationId: module.qualificationId
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
      .populate('user')
      .populate('coordinator')
      .populate('moderator')
      .populate('coordinator')
      .populate('venue');
  }
  public static async deleteModule(module: any) {
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
      .populate('user')
      .populate('coordinator')
      .populate('moderator')
      .populate('coordinator')
      .populate('venue');
  }
  public static async assignUserToModule(
    moduleId: string,
    blockId: string,
    offeringTypeId: string,
    qualificationId: string,
    userId: string
  ) {
    return await Module.findOneAndUpdate(
      {
        moduleId: moduleId,
        blockId: blockId,
        offeringTypeId: offeringTypeId,
        qualificationId: qualificationId
      },
      {
        $set: {
          userId: userId
        }
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
      .populate('user')
      .populate('coordinator')
      .populate('moderator')
      .populate('coordinator')
      .populate('venue');
  }
  public static async unassignUserFromModule(
    moduleId: string,
    blockId: string,
    offeringTypeId: string,
    qualificationId: string
  ) {
    return await Module.findOneAndUpdate(
      {
        moduleId: moduleId,
        blockId: blockId,
        offeringTypeId: offeringTypeId,
        qualificationId: qualificationId
      },
      {
        $set: {
          userId: null
        }
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
      .populate('user')
      .populate('coordinator')
      .populate('moderator')
      .populate('coordinator')
      .populate('venue');
  }
  public static async assignCoordinatorToModule(
    moduleId: string,
    blockId: string,
    offeringTypeId: string,
    qualificationId: string,
    userId: string
  ) {
    return await Module.findOneAndUpdate(
      {
        moduleId: moduleId,
        blockId: blockId,
        offeringTypeId: offeringTypeId,
        qualificationId: qualificationId
      },
      {
        $set: {
          coordinatorId: userId
        }
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
      .populate('user')
      .populate('coordinator')
      .populate('moderator')
      .populate('coordinator')
      .populate('venue');
  }
  public static async unassignCoordinatorFromModule(
    moduleId: string,
    blockId: string,
    offeringTypeId: string,
    qualificationId: string
  ) {
    return await Module.findOneAndUpdate(
      {
        moduleId: moduleId,
        blockId: blockId,
        offeringTypeId: offeringTypeId,
        qualificationId: qualificationId
      },
      {
        $set: {
          coordinatorId: null
        }
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
      .populate('user')
      .populate('coordinator')
      .populate('moderator')
      .populate('coordinator')
      .populate('venue');
  }
  public static async assignModeratorToModule(
    moduleId: string,
    blockId: string,
    offeringTypeId: string,
    qualificationId: string,
    userId: string
  ) {
    return await Module.findOneAndUpdate(
      {
        moduleId: moduleId,
        blockId: blockId,
        offeringTypeId: offeringTypeId,
        qualificationId: qualificationId
      },
      {
        $set: {
          moderatorId: userId
        }
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
      .populate('user')
      .populate('coordinator')
      .populate('moderator')
      .populate('coordinator')
      .populate('venue');
  }
  public static async unassignModeratorFromModule(
    moduleId: string,
    blockId: string,
    offeringTypeId: string,
    qualificationId: string
  ) {
    return await Module.findOneAndUpdate(
      {
        moduleId: moduleId,
        blockId: blockId,
        offeringTypeId: offeringTypeId,
        qualificationId: qualificationId
      },
      {
        $set: {
          moderatorId: null
        }
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
      .populate('user')
      .populate('coordinator')
      .populate('moderator')
      .populate('coordinator')
      .populate('venue');
  }
  public static async unassignAllFromModule(
    moduleId: string,
    blockId: string,
    offeringTypeId: string,
    qualificationId: string
  ) {
    return await Module.findOneAndUpdate(
      {
        moduleId: moduleId,
        blockId: blockId,
        offeringTypeId: offeringTypeId,
        qualificationId: qualificationId
      },
      {
        $set: {
          userId: null,
          coordinatorId: null,
          moderatorId: null
        }
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
      .populate('user')
      .populate('coordinator')
      .populate('moderator')
      .populate('coordinator')
      .populate('venue');
  }
  public static async unassignAllModules() {
    await Module.updateMany(
      { userId: { $nin: [null, ''] } },
      {
        $set: {
          userId: null,
          coordinatorId: null,
          moderatorId: null
        }
      }
    );
    return 'All modules unassigned';
  }
  public static async stackModules(modules: IModule[]) {
    const stackId: string = uuidv4();

    const updatedModules = modules.map(async (module: IModule) => {
      return await Module.findOneAndUpdate(
        {
          moduleId: module.moduleId,
          blockId: module.blockId,
          offeringTypeId: module.offeringTypeId,
          qualificationId: module.qualificationId
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
  public static async addModuleToStack(module: IModule, stackId: string) {
    return await Module.findOneAndUpdate(
      {
        moduleId: module.moduleId,
        blockId: module.blockId,
        offeringTypeId: module.offeringTypeId,
        qualificationId: module.qualificationId
      },
      {
        $set: {
          stackId: stackId
        }
      },
      { upsert: true }
    );
  }
  public static async resetStacks() {
    const modules: IModule[] = (await Module.find().orFail()) as IModule[];

    await modules.map(async (module: IModule) => {
      await Module.findOneAndUpdate(
        {
          moduleId: module.moduleId,
          blockId: module.blockId,
          offeringTypeId: module.offeringTypeId,
          qualificationId: module.qualificationId
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

    await modules.map(async module => {
      const enrolled: number = Math.floor(
        Math.random() * (400 - 100 + 1) + 100
      );
      await Module.findOneAndUpdate(
        {
          moduleId: module.moduleId,
          blockId: module.blockId,
          offeringTypeId: module.offeringTypeId,
          qualificationId: module.qualificationId
        },
        {
          $set: {
            enrolled: enrolled
          }
        },
        { upsert: true }
      );
    });
    return 'All module have been given enrollments';
  }
}
