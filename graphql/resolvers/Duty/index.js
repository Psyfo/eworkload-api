const Duty = require('../../../models/duty');

module.exports = {
    Query: {
        duty: (root, args) => {
            return Duty.findOne(args)
                .populate()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        duties: () => {
            return Duty.find({})
                .sort({dutyId: 'asc'})
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
        addDuty: (root, args) => {
            const newDuty = new Duty({
                dutyId: args.dutyId,
                name: args.name,
                description: args.description
            });

            return newDuty.save()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        editDuty: (root, args) => {
            return Duty.findOneAndUpdate({
                    dutyId: args.dutyId
                }, {
                    $set: {
                        name: args.name,
                        description: args.description
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
        deleteDuty: (root, args) => {
            return Duty.findOneAndRemove(args)
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