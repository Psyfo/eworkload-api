import bcrypt from 'bcryptjs';
import IUser from 'interfaces/user.interface';
import jwt from 'jsonwebtoken';

import { logger } from '../config/logger';
import Evidence from '../models/evidence.model';
import User from '../models/user.model';

export default class UserController {
  public static async user(userId: string) {
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
  }
  public static async users() {
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
  }
  public static async usersByPosition() {
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
  }
  public static async createUser(user: IUser) {
    return await new User(user).save();
  }
  public static async updateUser(user: IUser) {
    return await User.findOneAndUpdate(
      { userId: user.userId },
      {
        $set: user
      },
      { upsert: true }
    );
  }
  public static async deleteUser(user: IUser) {
    return await User.findOneAndRemove(user);
  }
  public static async exists(userId: string) {
    let result: boolean = false;
    let data: number = await User.countDocuments({
      userId: userId
    });
    if (data !== 0) {
      result = true;
    }

    return result;
  }
  public static async assignProfilePicture(userId: string, photoUrl: string) {
    return await User.findOneAndUpdate(
      { userId: userId },
      {
        $set: {
          photoUrl: photoUrl
        }
      },
      { upsert: true }
    );
  }
}
