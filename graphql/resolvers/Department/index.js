import Department from '../../../models/department';

export default {
  Query: {
    department: (root, args) => {
      return Department.findOne({
        departmentId: args.departmentId
      })
        .populate('faculty')
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    departments: () => {
      return Department.find({})
        .sort('departmentId')
        .populate('faculty')
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  Mutation: {
    addDepartment: (root, args) => {
      const newDepartment = new Department({
        departmentId: args.departmentId,
        name: args.name,
        facultyId: args.facultyId
      });

      return newDepartment
        .save()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    editDepartment: (root, args) => {
      return Department.findOneAndUpdate(
        {
          departmentId: args.departmentId
        },
        {
          $set: {
            name: args.name,
            facultyId: args.facultyId
          }
        }
      )
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    deleteDepartment: (root, args) => {
      return Department.findOneAndRemove(args)
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  }
};
