const LectureStack = require('../../../models/lecture-stack');

module.exports = {
    Query: {
        lectureStack: (root, args) => {
            return LectureStack.findOne(args)
                .populate('discipline')
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        lectureStacks: () => {
            return LectureStack.find({})
                .populate('discipline')
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        }
    },
    Mutation: {
        addLectureStack: (root, args) => {
            const newLectureStack = new LectureStack({
                lectureStackId: args.lectureStackId,
                disciplineId: args.disciplineId,
                modules: args.modules,
                groups: args.groups
            });

            return newLectureStack.save()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        editLectureStack: (root, args) => {
            return LectureStack.findOneAndUpdate({
                    lectureStackId: args.lectureStackId
                }, {
                    $set: {
                        discipline: args.discipline,
                        modules: args.modules,
                        groups: args.groups
                    }
                })
                .populate('discipline')
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        deleteLectureStack: (root, args) => {
            return LectureStack.findOneAndRemove(args)
                .populate('discipline')
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        }
    }
};