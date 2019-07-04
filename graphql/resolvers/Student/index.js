import Student from '../../../models/student';

export default {
  Query: {
    student: (root, args) => {
      return Student.findOne(args)
        .populate()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    students: () => {
      return Student.find({})
        .sort({
          studentId: 'asc'
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
    addStudent: (root, args) => {
      const newStudent = new Student({
        studentId: args.student.studentId,
        email: args.student.email,
        firstName: args.student.firstName,
        lastName: args.student.lastName,
        title: args.student.title,
        year: args.student.year
      });

      return newStudent
        .save()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    editStudent: (root, args) => {
      return Student.findOneAndUpdate(
        {
          studentId: args.student.studentId
        },
        {
          $set: {
            email: args.student.email,
            firstName: args.student.firstName,
            lastName: args.student.lastName,
            title: args.student.title,
            year: args.student.year
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
    deleteStudent: (root, args) => {
      return Student.findOneAndRemove(args.student)
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
