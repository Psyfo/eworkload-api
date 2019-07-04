import Module from '../../../models/module';

export default {
  Query: {
    module: (root, args) => {
      return Module.findOne({ moduleId: args.moduleId })
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
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    modules: () => {
      return Module.find({})
        .sort({
          moduleId: 'asc'
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
        .populate('venue')
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    modulesByDiscipline: (root, args) => {
      return Module.find({ disciplineId: args.disciplineId })
        .sort({
          moduleId: 'asc'
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
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    unassignedModules: () => {
      return Module.find({ userId: null })
        .sort({
          moduleId: 'asc'
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
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    modulesByUser: (root, args) => {
      return Module.find({ userId: args.userId })
        .sort({
          moduleId: 'asc'
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
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    modulesByModerator: (root, args) => {
      return Module.find({ moderatorId: args.moderatorId })
        .sort({
          moduleId: 'asc'
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
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    modulesByCoordinator: (root, args) => {
      return Module.find({ coordinator: args.coordinator })
        .sort({
          moduleId: 'asc'
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
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    stackedWith: (root, args) => {
      return Module.find({ stackId: args.stackId })
        .sort({
          moduleId: 'asc'
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
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  Mutation: {
    addModule: (root, args) => {
      const newModule = new Module({
        moduleId: args.module.moduleId,
        name: args.module.name,
        type: args.module.type,
        assessmentMethod: args.module.assessmentMethod,
        nqfLevel: args.module.nqfLevel,
        qualificationId: args.module.qualificationId,
        offeringTypeId: args.module.offeringTypeId,
        disciplineId: args.module.disciplineId,
        blockId: args.module.blockId,
        userId: args.module.userId,
        coordinatorId: args.module.coordinatorId,
        moderatorId: args.module.moderatorId,
        credits: parseInt(args.module.credits),
        groupSize: parseInt(args.module.groupSize),
        studyPeriod: args.module.studyPeriod,
        lecturedBy: args.module.lecturedBy,
        moderation: args.module.moderation
      });

      return newModule
        .save()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    addModules: (root, args) => {
      let newModules = [];
      args.modules.forEach(module => {
        let newModule = new Module({
          moduleId: module.moduleId,
          name: module.name,
          type: module.type,
          assessmentMethod: module.assessmentMethod,
          nqfLevel: module.nqfLevel,
          qualificationId: module.qualificationId,
          offeringTypeId: module.offeringTypeId,
          disciplineId: module.disciplineId,
          blockId: module.blockId,
          userId: module.userId,
          coordinatorId: module.coordinatorId,
          moderatorId: module.moderatorId,
          credits: module.credits,
          groupSize: parseInt(module.groupSize),
          studyPeriod: module.studyPeriod,
          lecturedBy: module.lecturedBy,
          moderation: module.moderation
        });
        newModules.push(newModule);
      });

      return Module.insertMany(newModules, { ordered: false })
        .then(result => {
          console.log('Bulk upload complete');
          newModules = [];
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    editModule: (root, args) => {
      return Module.findOneAndUpdate(
        {
          moduleId: args.module.moduleId
        },
        {
          $set: {
            name: args.module.name,
            type: args.module.type,
            assessmentMethod: args.module.assessmentMethod,
            nqfLevel: args.module.nqfLevel,
            qualificationId: args.module.qualificationId,
            offeringTypeId: args.module.offeringTypeId,
            disciplineId: args.module.disciplineId,
            blockId: args.module.blockId,
            userId: args.module.userId,
            coordinatorId: args.module.coordinatorId,
            moderatorId: args.module.moderatorId,
            credits: parseInt(args.module.credits),
            groupSize: parseInt(args.module.groupSize),
            studyPeriod: args.module.studyPeriod,
            lecturedBy: args.module.lecturedBy,
            moderation: args.module.moderation
          }
        }
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
        .populate('venue')
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    deleteModule: (root, args) => {
      return Module.findOneAndRemove(args.module)
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
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  }
};
