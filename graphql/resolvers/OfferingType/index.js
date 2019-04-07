const OfferingType = require('../../../models/offering-type');

module.exports = {
    Query: {
        offeringType: (root, args) => {
            return OfferingType.findOne(args)
                .populate()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        offeringTypes: () => {
            return OfferingType.find({})
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
        addOfferingType: (root, args) => {
            const newOfferingType = new OfferingType({
                description: args.description
            });

            return newOfferingType.save()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        editOfferingType: (root, args) => {
            return OfferingType.findOneAndUpdate({
                    offeringTypeId: args.offeringTypeId
                }, {
                    $set: {
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
        deleteOfferingType: (root, args) => {
            return OfferingType.findOneAndRemove(args)
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