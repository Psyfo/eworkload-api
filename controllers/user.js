import User from './../models/user';
import Evidence from './../models/evidence';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

let user = async userId => {
  return await User.findOne({ userId: userId })
    .populate('disciplines')
    .populate({
      path: 'department',
      model: 'Department',
      populate: {
        path: 'faculty',
        model: 'Faculty'
      }
    })
    .populate('position')
    .populate('workFocus');
};
let users = async () => {
  return await User.find({})
    .populate('disciplines')
    .populate({
      path: 'department',
      model: 'Department',
      populate: {
        path: 'faculty',
        model: 'Faculty'
      }
    })
    .populate('position')
    .populate('workFocus');
};
let usersByPosition = async () => {
  return await User.find({ positionId: 'HOD' })
    .populate('disciplines')
    .populate({
      path: 'department',
      model: 'Department',
      populate: {
        path: 'faculty',
        model: 'Faculty'
      }
    })
    .populate('position')
    .populate('workFocus');
};
let addUser = async user => {
  console.log('User from client:', user);

  const newUser = await new User(user);
  console.log('New user:', newUser);

  return await newUser.save();
};
let editUser = async user => {
  return await User.findOneAndUpdate(
    { userId: user.userId },
    {
      $set: user
    },
    { upsert: true }
  );
};
let deleteUser = async user => {
  return await User.findOneAndRemove(user);
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
    .populate('disciplines')
    .populate({
      path: 'department',
      model: 'Department',
      populate: {
        path: 'faculty',
        model: 'Faculty'
      }
    })
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
let assignProfilePicture = async (userId, photoUrl) => {
  return await User.findOneAndUpdate(
    { userId: userId },
    {
      $set: {
        photoUrl: photoUrl
      }
    },
    { upsert: true }
  );
};

let assignEvidence = async (evidenceId, evidenceUrl) => {
  return await Evidence.findOneAndUpdate(
    { evidenceId: evidenceId },
    {
      $set: {
        evidenceUrl: evidenceUrl
      }
    },
    { upsert: true }
  );
};

export {
  user,
  users,
  usersByPosition,
  addUser,
  editUser,
  deleteUser,
  exists,
  login,
  changePassword,
  assignProfilePicture,
  assignEvidence
};
