import User from '../../../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default {
  Query: {
    user: (root, args) => {
      return User.findOne(args)
        .populate('discipline')
        .populate('position')
        .populate('workFocus')
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
    login: (root, args) => {
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
    },
    userExists: (root, args) => {
      return User.countDocuments({
        userId: args.userId
      })
        .then(result => {
          let data = {
            exists: false
          };
          if (result !== 0) {
            data.exists = true;
          }
          return data;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  Mutation: {
    addUser: (root, args) => {
      const newUser = new User({
        userId: args.user.userId,
        password: args.user.password,
        email: args.user.email,
        firstName: args.user.firstName,
        lastName: args.user.lastName,
        photoUrl: args.user.photoUrl,
        disciplineId: args.user.disciplineId,
        positionId: args.user.positionId,
        workFocusName: args.user.workFocusName,
        gender: args.user.gender,
        nationality: args.user.nationality
      });

      return newUser
        .save()
        .then(result => {
          console.log(result);

          return result;
        })
        .catch(err => {
          console.log(err);
          throw err;
        });
    },
    editUser: (root, args) => {
      return User.findOneAndUpdate(
        {
          userId: args.user.userId
        },
        {
          $set: {
            password: args.user.password,
            email: args.user.email,
            firstName: args.user.firstName,
            lastName: args.user.lastName,
            photoUrl: args.user.photoUrl,
            disciplineId: args.user.disciplineId,
            positionId: args.user.positionId,
            workFocusName: args.user.workFocusName,
            gender: args.user.gender,
            nationality: args.user.nationality
          }
        }
      )
        .exec()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    deleteUser: (root, args) => {
      return User.findOneAndRemove(args.user)
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    changePassword: async (root, args) => {
      let user = await User.findOne({ userId: args.userId });
      let comparison = await bcrypt.compare(args.oldPassword, user.password);
      if (comparison !== true) {
        throw new Error('Password incorrect');
      }
      return user;
    }
  }
};
