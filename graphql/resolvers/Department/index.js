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
        departmentId: args.department.departmentId,
        name: args.department.name,
        facultyId: args.department.facultyId
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
          departmentId: args.department.departmentId
        },
        {
          $set: {
            name: args.department.name,
            facultyId: args.department.facultyId
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
      return Department.findOneAndRemove(args.department)
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  }
};
