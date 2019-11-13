import uuidv4 from 'uuid/v4';

import Module from '../models/module.model';
import IModule from 'interfaces/module.interface';

let _module = async (
  moduleId: string,
  blockId: string,
  offeringTypeId: string,
  qualificationId: string
) => {
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
};
let modules = async () => {
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
};
let modulesByDiscipline = async (disciplineIds: string[]) => {
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
};
let modulesByUnassigned = async () => {
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
};
let modulesByAssigned = async () => {
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
};
let modulesByUser = async (userId: string) => {
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
};
let modulesByModerator = async (moderatorId: string) => {
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
};
let modulesByCoordinator = async (coordinatorId: string) => {
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
};
let modulesByStack = async (stackId: string) => {
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
};
let modulesByUnassignedAndDiscipline = async (
  userId: string,
  disciplineIds: string[]
) => {
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
};
let addModule = async (module: any) => {
  const newModule = await new Module(module);

  return await newModule.save();
};
let addModules = async (modules: any[]) => {
  let newModules: any[] = [];
  modules.forEach(module => {
    let newModule = new Module(module);
    newModules.push(newModule);
  });

  let result = await Module.insertMany(newModules, { ordered: false });

  console.log('Bulk upload complete');
  return result;
};
let editModule = async (module: any) => {
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
};
let deleteModule = async (module: any) => {
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
};
let assignUserToModule = async (
  moduleId: string,
  blockId: string,
  offeringTypeId: string,
  qualificationId: string,
  userId: string
) => {
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
};
let unassignUserFromModule = async (
  moduleId: string,
  blockId: string,
  offeringTypeId: string,
  qualificationId: string
) => {
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
};
let assignCoordinatorToModule = async (
  moduleId: string,
  blockId: string,
  offeringTypeId: string,
  qualificationId: string,
  userId: string
) => {
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
};
let unassignCoordinatorFromModule = async (
  moduleId: string,
  blockId: string,
  offeringTypeId: string,
  qualificationId: string
) => {
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
};
let assignModeratorToModule = async (
  moduleId: string,
  blockId: string,
  offeringTypeId: string,
  qualificationId: string,
  userId: string
) => {
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
};
let unassignModeratorFromModule = async (
  moduleId: string,
  blockId: string,
  offeringTypeId: string,
  qualificationId: string
) => {
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
};
let unassignAllFromModule = async (
  moduleId: string,
  blockId: string,
  offeringTypeId: string,
  qualificationId: string
) => {
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
};
let unassignAllModules = async () => {
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
};
let stackModules = async (modules: IModule[]) => {
  const stackId: string = uuidv4();

  const updatedModules = modules.map(async module => {
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
};
let addModuleToStack = async (module: IModule, stackId: string) => {
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
};
let resetStacks = async () => {
  const modules: any[] = await Module.find().orFail();

  const stackedModules: any[] = await modules.map(async module => {
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
  console.log('All module stacks reset');
  return 'All module stacks reset';
};
let resetEnrollments = async () => {
  const modules: any[] = await Module.find().orFail();

  const enrolledModules: any[] = await modules.map(async module => {
    const enrolled = Math.floor(Math.random() * (400 - 100 + 1) + 100);
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
  console.log('All module have been given enrollments');
  return 'All module have been given enrollments';
};

export {
  _module,
  modules,
  modulesByDiscipline,
  modulesByUnassigned,
  modulesByAssigned,
  modulesByUnassignedAndDiscipline,
  modulesByUser,
  modulesByModerator,
  modulesByCoordinator,
  modulesByStack,
  addModule,
  addModules,
  editModule,
  deleteModule,
  assignUserToModule,
  unassignUserFromModule,
  assignCoordinatorToModule,
  unassignCoordinatorFromModule,
  assignModeratorToModule,
  unassignModeratorFromModule,
  unassignAllFromModule,
  unassignAllModules,
  stackModules,
  resetStacks,
  addModuleToStack,
  resetEnrollments
};
