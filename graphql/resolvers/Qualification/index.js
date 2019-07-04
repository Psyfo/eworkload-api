import Qualification from '../../../models/qualification';

export default {
  Query: {
    qualification: (root, args) => {
      return Qualification.findOne(args)
        .populate('department')
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    qualifications: () => {
      return Qualification.find({})
        .sort({
          qualificationId: 'asc'
        })
        .populate('department')
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  Mutation: {
    addQualification: (root, args) => {
      const newQualification = new Qualification({
        qualificationId: args.qualification.qualificationId,
        name: args.qualification.name,
        type: args.qualification.type,
        departmentId: args.qualification.departmentId
      });

      return newQualification
        .save()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    editQualification: (root, args) => {
      return Qualification.findOneAndUpdate(
        {
          qualificationId: args.qualification.qualificationId
        },
        {
          $set: {
            name: args.qualification.name,
            type: args.qualification.type,
            departmentId: args.qualification.departmentId
          }
        }
      )
        .populate('department')
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    deleteQualification: (root, args) => {
      return Qualification.findOneAndRemove(args)
        .populate('department')
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  }
};
