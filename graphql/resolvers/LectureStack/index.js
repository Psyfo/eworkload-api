import LectureStack from '../../../models/lecture-stack';

export default {
  Query: {
    lectureStack: (root, args) => {
      return LectureStack.findOne(args)
        .populate('discipline')
        .populate('module')
        .populate('user')
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    lectureStacks: () => {
      return LectureStack.find({})
        .populate('discipline')
        .populate('module')
        .populate('user')
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  Mutation: {
    addLectureStack: (root, args) => {
      const newLectureStack = new LectureStack({
        disciplineId: args.disciplineId,
        moduleIds: args.moduleIds,
        groups: args.groups,
        userIds: args.userIds
      });

      return newLectureStack
        .save()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    editLectureStack: (root, args) => {
      return LectureStack.findOneAndUpdate(
        {
          lectureStackId: args.lectureStackId
        },
        {
          $set: {
            discipline: args.discipline,
            moduleIds: args.moduleIds,
            groups: args.groups,
            userIds: args.userIds
          }
        }
      )
        .populate('discipline')
        .populate('module')
        .populate('user')
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    deleteLectureStack: (root, args) => {
      return LectureStack.findOneAndRemove(args)
        .populate('discipline')
        .populate('module')
        .populate('user')
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  }
};
