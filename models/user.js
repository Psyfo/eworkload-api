import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import validator from 'validator';

import Position from './position';
import Discipline from './discipline';

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: value => {
        return validator.isEmail(value);
      }
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    photoUrl: {
      type: String
    },
    disciplineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Discipline'
    },
    positionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Position'
    },
    gender: {
      type: String
    },
    nationality: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// VIRTUALS
userSchema.virtual('discipline', {
  ref: 'Discipline',
  localField: 'disciplineId',
  foreignField: 'disciplineId',
  justOne: true
});
userSchema.virtual('position', {
  ref: 'Position',
  localField: 'positionId',
  foreignField: 'positionId',
  justOne: true
});

// HOOKS
// Pre-hook to hash password. Make sure to use function and not arrow (lexical 'this' problem)
userSchema.pre('save', function(next) {
  const user = this;
  // Generate salt and hash password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) throw err;
      console.log('Password ' + user.password);
      user.password = hash;
    });
  });

  // Indicates we're done and moves on to the next middleware
  next();
});

// INSTANCE METHODS
// Ensure correct password
userSchema.methods.isValidPassword = async password => {
  const user = this;

  // Hash sent password and compare with db hash
  const compare = await bcrypt.compare(password, user.password);
};

const User = mongoose.model('User', userSchema);
export default User;
