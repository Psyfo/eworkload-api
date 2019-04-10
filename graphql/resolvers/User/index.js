import User from '../../../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default {
  Query: {
    user: (root, args, context) => {

      return User.findOne(args)
        .populate('discipline')
        .populate('position')
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    users: () => {
      return User.find({})
        .sort({
          studentId: 'asc'
        })
        .populate('discipline')
        .populate('position')
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    login: (root, args, context) => {
      return User.findOne({ userId: args.userId })
        .then(user => {
          if (!user) {
            throw new Error('User does not exist');
          }
          return bcrypt
            .compare(args.password, user.password)
            .then(res => {
              if (res) {
                const token = jwt.sign({ userId: user.userId }, 'secret', {
                  expiresIn: '1h'
                });

                const payload = {
                  userId: user.userId,
                  token: token,
                  tokenExpiration: 1
                };
                console.log(payload);
                return payload;
              }
              throw new Error('Password is username incorrect');
            })
            .catch(err => {
              throw err;
            });
        })
        .catch(err => {
          throw err;
        });
    }
  },
  Mutation: {
    addUser: (root, args) => {
      const newUser = new User({
        userId: args.userId,
        password: args.password,
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        photoUrl: args.photoUrl,
        disciplineId: args.disciplineId,
        positionId: args.positionId,
        gender: args.gender,
        nationality: args.nationality
      });

      return newUser
        .save()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    editUser: (root, args) => {
      return User.findOneAndUpdate(
        {
          userId: args.userId
        },
        {
          $set: {
            password: args.userId,
            email: args.email,
            firstName: args.firstName,
            lastName: args.lastName,
            photoUrl: args.photoUrl,
            disciplineId: args.disciplineId,
            positionId: args.positionId,
            gender: args.gender,
            nationality: args.nationality
          }
        }
      )
        .exec()
        .populate('discipline')
        .populate('position')
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    deleteUser: (root, args) => {
      return User.findOneAndRemove(args)
        .populate('discipline')
        .populate('position')
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  }
};
