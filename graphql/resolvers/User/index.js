const User = require('../../../models/user');

module.exports = {
    Query: {
        user: (root, args) => {
            return User.findOne(args)
                .populate('discipline')
                .populate('position')
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        users: () => {
            return User.find({})
                .sort({
                    studentId: 'asc'
                })
                .populate('discipline')
                .populate('position')
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        }
    },
    Mutation: {
        addUser: (root, args) => {
            const newUser = new User({
                userId: args.userId,
                password: args.password,
                email: args.email,
                firstName: args.firstName,
                lastName: args.lastName,
                photoUrl: args.photoUrl,
                disciplineId: args.disciplineId,
                positionId: args.positionId,
                gender: args.gender,
                nationality: args.nationality
            });

            return newUser.save()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        editUser: (root, args) => {
            return User.findOneAndUpdate({
                    userId: args.userId
                }, {
                    $set: {
                        password: args.userId,
                        email: args.email,
                        firstName: args.firstName,
                        lastName: args.lastName,
                        photoUrl: args.photoUrl,
                        disciplineId: args.disciplineId,
                        positionId: args.positionId,
                        gender: args.gender,
                        nationality: args.nationality
                    }
                })
                .exec()
                .populate('discipline')
                .populate('position')
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        deleteUser: (root, args) => {
            return User.findOneAndRemove(args)
                .populate('discipline')
                .populate('position')
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        }
    }
};