import Module from './../models/module.js';

let module = async (moduleId, blockId, offeringTypeId, qualificationId) => {
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
    .populate('venue');
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
    .populate('venue');
};
let modulesByDiscipline = async disciplineIds => {
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
    .populate('venue');
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
    .populate('venue');
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
    .populate('venue');
};
let modulesByUser = async userId => {
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
    .populate('venue');
};
let modulesByModerator = async moderatorId => {
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
    .populate('venue');
};
let modulesByCoordinator = async coordinatorId => {
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
    .populate('venue');
};
let modulesByStack = async stackId => {
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
    .populate('venue');
};
let modulesByUnassignedAndDiscipline = async (userId, disciplineIds) => {
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
    .populate('venue');
};

let addModule = async module => {
  const newModule = await new Module(module);

  return await newModule
    .save()
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

let addModules = async modules => {
  let newModules = [];
  modules.forEach(module => {
    let newModule = new Module(module);
    newModules.push(newModule);
  });

  let result = await Module.insertMany(newModules, { ordered: false })
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

  console.log('Bulk upload complete');
  return result;
};

let editModule = async module => {
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

let deleteModule = async module => {
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
  moduleId,
  blockId,
  offeringTypeId,
  qualificationId,
  userId
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
  moduleId,
  blockId,
  offeringTypeId,
  qualificationId
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
  moduleId,
  blockId,
  offeringTypeId,
  qualificationId,
  userId
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
  moduleId,
  blockId,
  offeringTypeId,
  qualificationId
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
  moduleId,
  blockId,
  offeringTypeId,
  qualificationId,
  userId
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
  moduleId,
  blockId,
  offeringTypeId,
  qualificationId
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
  moduleId,
  blockId,
  offeringTypeId,
  qualificationId
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

export {
  module,
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
  unassignAllModules
};
