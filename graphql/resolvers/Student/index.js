const Student = require('../../../models/student');

module.exports = {
    Query: {
        student: (root, args) => {
            return Student.findOne(args)
                .populate()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
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
                })
        }
    },
    Mutation: {
        addStudent: (root, args) => {
            const newStudent = new Student({
                studentId: args.studentId,
                email: args.email,
                firstName: args.firstName,
                lastName: args.lastName,
                title: args.title,
                year: args.year
            });

            return newStudent.save()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        editStudent: (root, args) => {
            return Student.findOneAndUpdate({
                    studentId: args.studentId
                }, {
                    $set: {
                        email: args.email,
                        firstName: args.firstName,
                        lastName: args.lastName,
                        title: args.title,
                        year: args.year
                    }
                })
                .populate()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        deleteStudent: (root, args) => {
            return Student.findOneAndRemove(args)
                .populate()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        }
    }
};