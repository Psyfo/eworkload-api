import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Evidence from "../models/evidence.model";
import User from "../models/user.model";

let user = async (userId: string) => {
  return await User.findOne({ userId: userId })
    .populate("disciplines")
    .populate({
      path: "department",
      model: "Department",
      populate: {
        path: "faculty",
        model: "Faculty"
      }
    })
    .populate("position")
    .populate("workFocus");
};
let users = async () => {
  return await User.find({})
    .populate("disciplines")
    .populate({
      path: "department",
      model: "Department",
      populate: {
        path: "faculty",
        model: "Faculty"
      }
    })
    .populate("position")
    .populate("workFocus");
};
let usersByPosition = async () => {
  return await User.find({ positionId: "HOD" })
    .populate("disciplines")
    .populate({
      path: "department",
      model: "Department",
      populate: {
        path: "faculty",
        model: "Faculty"
      }
    })
    .populate("position")
    .populate("workFocus");
};
let addUser = async (user: any) => {
  const newUser = new User(user);

  return await newUser.save();
};
let editUser = async (user: any) => {
  return await User.findOneAndUpdate(
    { userId: user.userId },
    {
      $set: user
    },
    { upsert: true }
  );
};
let deleteUser = async (user: any) => {
  return await User.findOneAndRemove(user);
};
let exists = async (userId: string) => {
  let result = { exists: false };
  let data = await User.countDocuments({
    userId: userId
  });
  if (data !== 0) {
    result.exists = true;
  }

  return result;
};
let login = async (userId: string, password: string) => {
  // CHECK USER EXISTS
  const user: any = await User.findOne({ userId: userId })
    .populate("disciplines")
    .populate({
      path: "department",
      model: "Department",
      populate: {
        path: "faculty",
        model: "Faculty"
      }
    })
    .populate("position")
    .populate("workFocus");

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const token = jwt.sign({ userId: user.userId }, "secret", {
      expiresIn: "1h"
    });

    const payload = {
      userId: user.userId,
      token: token,
      tokenExpiration: 1
    };
    console.log(payload);
    return payload;
  } else {
    throw new Error("Passwords do not match");
  }
};
let changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  let user: any = await User.findOne({ userId: userId });
  let comparison = await bcrypt.compare(oldPassword, user.password);
  if (comparison !== true) {
    throw new Error("Password incorrect");
  }
  user.password = newPassword;
  user.save();
  return user;
};
let assignProfilePicture = async (userId: string, photoUrl: string) => {
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
let assignEvidence = async (evidenceId: string, evidenceUrl: string) => {
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
