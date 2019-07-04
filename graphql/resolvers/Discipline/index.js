import Discipline from '../../../models/discipline';

export default {
  Query: {
    discipline: (root, args) => {
      return Discipline.findOne(args)
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    disciplines: () => {
      return Discipline.find({})
        .sort('name')
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  Mutation: {
    addDiscipline: (root, args) => {
      const newDiscipline = new Discipline({
        disciplineId: args.discipline.disciplineId,
        name: args.discipline.name,
        description: args.discipline.description
      });

      return newDiscipline
        .save()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    editDiscipline: (root, args) => {
      return Discipline.findOneAndUpdate(
        {
          disciplineId: args.discipline.disciplineId
        },
        {
          $set: {
            name: args.discipline.name,
            description: args.discipline.description
          }
        }
      )
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    deleteDiscipline: (root, args) => {
      return Discipline.findOneAndRemove(args.discipline)
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  }
};
