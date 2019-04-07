const Qualification = require('../../../models/qualification');

module.exports = {
    Query: {
        qualification: (root, args) => {
            return Qualification.findOne(args)
                .populate('department')
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        qualifications: () => {
            return Qualification.find({})
                .sort({
                    qualificationId: 'asc'
                })
                .populate('department')
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
    },
    Mutation: {
        addQualification: (root, args) => {
            const newQualification = new Qualification({
                qualificationId: args.qualificationId,
                name: args.name,
                type: args.type,
                saqaId: args.saqaId,
                department: args.department,
                heqsfLevel: args.heqsfLevel,
                purpose: args.purpose,
                exitLevelOutcomes: args.exitLevelOutcomes,
                graduateAttributes: args.graduateAttributes
            });

            return newQualification.save()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        editQualification: (root, args) => {
            return Qualification.findOneAndUpdate({
                    qualificationId
                }, {
                    $set: {
                        name: args.name,
                        type: args.type,
                        saqaId: args.saqaId,
                        department: args.department,
                        heqsfLevel: args.heqsfLevel,
                        purpose: args.purpose,
                        exitLevelOutcomes: args.exitLevelOutcomes,
                        graduateAttributes: args.graduateAttributes
                    }
                })
                .populate('department')
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        deleteQualification: (root, args) => {
            return Qualification.findOneAndRemove(args)
                .populate('department')
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        }
    }
};