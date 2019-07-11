import User from './../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

let user = async userId => {
  return await User.findOne({ userId: userId })
    .populate('discipline')
    .populate('position')
    .populate('workFocus');
};

let users = async () => {
  return await User.find({})
    .populate('discipline')
    .populate('position')
    .populate('workFocus');
};

let addUser = async user => {
  const newUser = await new User(user);

  return await newUser
    .save()
    .populate('discipline')
    .populate('position')
    .populate('workFocus');
};

let editUser = async user => {
  return await User.findOneAndUpdate(
    { userId: user.userId },
    {
      $set: user
    },
    { upsert: true }
  )
    .populate('discipline')
    .populate('position')
    .populate('workFocus');
};

let deleteUser = async user => {
  return await User.findOneAndRemove(user)
    .populate('discipline')
    .populate('position')
    .populate('workFocus');
};

let exists = async userId => {
  let result = { exists: false };
  let data = await User.countDocuments({
    userId: userId
  });
  if (data !== 0) {
    result.exists = true;
  }

  return result;
};

let login = async (userId, password) => {
  // check user exists

  const user = await User.findOne({ userId: userId })
    .populate('discipline')
    .populate('position')
    .populate('workFocus');

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
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
};

let changePassword = async (userId, oldPassword, newPassword) => {
  let user = await User.findOne({ userId: userId });
  let comparison = await bcrypt.compare(oldPassword, user.password);
  if (comparison !== true) {
    throw new Error('Password incorrect');
  }
  user.password = newPassword;
  user.save();
  return user;
};

export {
  user,
  users,
  addUser,
  editUser,
  deleteUser,
  exists,
  login,
  changePassword
};
