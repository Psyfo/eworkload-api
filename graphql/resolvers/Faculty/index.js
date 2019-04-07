const Faculty = require('../../../models/faculty');

module.exports = {
    Query: {
        faculty: (root, args) => {
            return Faculty.findOne(args)
                .populate()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        faculties: () => {
            return Faculty.find({})
                .sort({
                    facultyId: 'asc'
                })
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
        addFaculty: (root, args) => {
            const newFaculty = new Faculty({
                facultyId: args.facultyId,
                name: args.name
            });

            return newFaculty.save()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        editFaculty: (root, args) => {
            return Faculty.findOneAndUpdate({
                    facultyId: args.facultyId
                }, {
                    $set: {
                        name: args.name
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
        deleteFaculty: (root, args) => {
            return Faculty.findOneAndRemove(args)
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