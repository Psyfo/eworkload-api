import Module from '../../../models/module';

export default {
  Query: {
    module: (root, args) => {
      return Module.findOne(args)
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
    modules: () => {
      return Module.find({})
        .sort({
          moduleId: 'asc'
        })
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
  },
  Mutation: {
    addModule: (root, args) => {
      const newModule = new Module({
        moduleId: args.moduleId,
        name: args.name,
        description: args.description,
        nqfLevel: args.nqfLevel,
        qualificationId: args.qualificationId,
        offeringTypeId: args.offeringTypeId,
        disciplineId: args.disciplineId,
        credits: args.credits,
        isMajor: args.isMajor,
        type: args.type,
        baseContact: args.baseContact,
        basePractical: args.basePractical
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
            description: args.description,
            nqfLevel: args.nqfLevel,
            qualification: args.qualification,
            offeringType: args.offeringType,
            discipline: args.discipline,
            credits: args.credits,
            isMajor: args.isMajor,
            type: args.type,
            baseContact: args.baseContact,
            basePractical: args.basePractical
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
