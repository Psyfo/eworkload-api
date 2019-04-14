import Module from '../../../models/module';

export default {
  Query: {
    module: (root, args) => {
      return Module.findOne(args)
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
        .populate('offering-type')
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
        .populate('offering-type')
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    modulesByDiscipline: (root, args) => {
      return Module.find({ args })
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
        .populate('offering-type')
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    modulesByModuleIds: (root, args) => {
      return Module.find({})
        .where('modules.moduleId')
        .in(args.moduleIds)
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
        .populate('offering-type')
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
        moduleId: args.moduleId,
        name: args.name,
        type: args.type,
        assessmentMethod: args.assessmentMethod,
        prerequisite: args.prerequisite,
        nqfLevel: args.nqfLevel,
        qualificationId: args.qualificationId,
        offeringTypeId: args.offeringTypeId,
        disciplineId: args.disciplineId,
        credits: args.credits
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
    editModule: (root, args) => {
      return Module.findOneAndUpdate(
        {
          moduleId: args.moduleId
        },
        {
          $set: {
            name: args.name,
            type: args.type,
            assessmentMethod: args.assessmentMethod,
            prerequisite: args.prerequisite,
            nqfLevel: args.nqfLevel,
            qualificationId: args.qualificationId,
            offeringTypeId: args.offeringTypeId,
            disciplineId: args.disciplineId,
            credits: args.credits
          }
        }
      )
        .populate('discipline')
        .populate('qualification')
        .populate('offering-type')
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    deleteModule: (root, args) => {
      return Module.findOneAndRemove(args)
        .populate('discipline')
        .populate('qualification')
        .populate('offering-type')
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  }
};
