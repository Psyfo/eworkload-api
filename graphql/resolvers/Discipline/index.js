const Discipline = require('../../../models/discipline');

module.exports = {
    Query: {
        discipline: (root, args) => {
            return Discipline.findOne(args)
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        disciplines: () => {
            return Discipline.find({})
                .sort('name')
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        }
    },
    Mutation: {
        addDiscipline: (root, args) => {
            const newDiscipline = new Discipline({
                disciplineId: args.disciplineId,
                name: args.name,
                description: args.description
            });

            return newDiscipline.save()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        editDiscipline: (root, args) => {
            return Discipline.findOneAndUpdate({
                    disciplineId: args.disciplineId
                }, {
                    $set: {
                        name: args.name,
                        description: args.description
                    }
                })
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        deleteDiscipline: (root, args) => {
            return Discipline.findOneAndRemove(args)
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        }
    }
};