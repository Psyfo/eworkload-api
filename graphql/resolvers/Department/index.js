const Department = require('../../../models/department');

module.exports = {
    Query: {
        department: (root, args) => {
            Department.findOne({
                    departmentId: args.departmentId
                })
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        departments: () => {
            Department.find({})
                .sort('departmentId')
                .populate('faculty')
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        }
    },
    Mutation: {
        addDepartment: (root, args) => {
            const newDepartment = new Department({
                departmentId: args.departmentId,
                name: args.name,
                faculty: args.faculty
            });

            newDepartment.save()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        editDepartment: (root, args) => {
            Department.findOneAndUpdate({
                    departmentId: args.departmentId
                }, {
                    $set: {
                        name: args.name,
                        facultyId: args.facultyId
                    }
                })
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        deleteDepartment: (root, args) => {
            Department.findOneAndRemove(args)
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        }
    }
};