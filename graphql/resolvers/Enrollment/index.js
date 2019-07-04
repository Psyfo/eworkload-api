import Enrollment from '../../../models/enrollment';
import Module from '../../../models/module';

export default {
  Query: {
    enrollment: (root, args) => {
      return Enrollment.findOne({
        enrollmentYear: args.enrollmentYear,
        qualificationId: args.qualificationId
      })
        .populate('qualification')
        .then(result => {
          return result;
        })
        .catch(error => {
          return error;
        });
    },
    enrollments: () => {
      return Enrollment.find({})
        .populate('qualification')
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    enrollmentsByYear: (root, args) => {
      return Enrollment.find({ enrollmentYear: args.enrollmentYear })
        .populate('qualification')
        .then(result => {
          return result;
        })
        .catch(error => {
          return error;
        });
    },
    enrollmentsByQualification: (root, args) => {
      return Enrollment.find({ qualificationId: args.qualificationId })
        .populate('qualification')
        .then(result => {
          return result;
        })
        .catch(error => {
          return error;
        });
    },
    studentsEnrolled: async (root, args) => {
      let students = 0;
      let year = new Date().getFullYear().toString();

      let module = await Module.findOne({ moduleId: args.moduleId });
      let enrollment = await Enrollment.findOne({
        qualificationId: module.qualificationId,
        enrollmentYear: year
      });

      if (module.studyPeriod === '1') {
        students = enrollment.firstYearEstimated;
      } else if (module.studyPeriod === '2') {
        students = enrollment.secondYearEstimated;
      } else if (module.studyPeriod === '3') {
        students = enrollment.thirdYearEstimated;
      }

      console.log('Number or Students enrolled:', students);
      return { students: students };
    }
  },
  Mutation: {
    addEnrollment: (root, args) => {
      console.log('Enrollment Args:', args);

      const newEnrollment = new Enrollment({
        enrollmentYear: args.enrollment.enrollmentYear,
        qualificationId: args.enrollment.qualificationId,
        firstYearEstimated: parseInt(args.enrollment.firstYearEstimated),
        secondYearEstimated: parseInt(args.enrollment.secondYearEstimated),
        thirdYearEstimated: parseInt(args.enrollment.thirdYearEstimated)
      });

      return newEnrollment
        .save()
        .then(result => {
          return result;
        })
        .catch(error => {
          return error;
        });
    },
    editEnrollment: (root, args) => {
      return Enrollment.findOneAndUpdate(
        {
          enrollmentYear: args.enrollment.enrollmentYear,
          qualificationId: args.enrollment.qualificationId
        },
        {
          $set: {
            firstYearEstimated: args.enrollment.firstYearEstimated,
            secondYearEstimated: args.enrollment.secondYearEstimated,
            thirdYearEstimated: args.enrollment.thirdYearEstimated
          }
        }
      )
        .then(result => {
          return result;
        })
        .catch(error => {
          return error;
        });
    }
  }
};
