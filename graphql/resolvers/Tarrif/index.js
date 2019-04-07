const Tarrif = require('../../../models/Tarrif');

module.exports = {
    Query: {
        tarrif: (root, args) => {
            return Tarrif.findOne(args)
                .populate()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        tarrifs: () => {
            return Tarrif.find({})
                .populate()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        }
    },
    Mutation: {
        addTarrif: (root, args) => {
            const newTarrif = new Tarrif({
                dutyId: args.dutyId,
                eventId: args.eventId,
                description: args.description,
                appliedTarrif: args.appliedTarrif,
                minHours: args.minHours,
                maxHours: args.maxHours,
                explanation: args.explanation,
                TRS: args.TRS,
                evidenceRequired: args.evidenceRequired
            });

            return newTarrif.save()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        editTarrif: (root, args) => {
            return Tarrif.findOneAndUpdate({
                    dutyId: args.dutyId,
                    eventId: args.eventId
                }, {
                    $set: {
                        description: args.description,
                        appliedTarrif: args.appliedTarrif,
                        minHours: args.minHours,
                        maxHours: args.maxHours,
                        explanation: args.explanation,
                        TRS: args.TRS,
                        evidenceRequired: args.evidenceRequired
                    }
                })
                .populate()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        deleteTarrif: (root, args) => {
            return Tarrif.findOneAndRemove(args)
                .populate()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        }
    }
};