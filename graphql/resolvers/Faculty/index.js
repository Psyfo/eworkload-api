import Faculty from '../../../models/faculty';

export default {
  Query: {
    faculty: (root, args) => {
      return Faculty.findOne(args)
        .populate()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
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
        });
    }
  },
  Mutation: {
    addFaculty: (root, args) => {
      const newFaculty = new Faculty({
        facultyId: args.faculty.facultyId,
        name: args.faculty.name
      });

      return newFaculty
        .save()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    editFaculty: (root, args) => {
      return Faculty.findOneAndUpdate(
        {
          facultyId: args.faculty.facultyId
        },
        {
          $set: {
            facultyId: args.faculty.facultyId,
            name: args.faculty.name
          }
        }
      )
        .populate()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    deleteFaculty: (root, args) => {
      return Faculty.findOneAndRemove(args.faculty)
        .populate()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  }
};
