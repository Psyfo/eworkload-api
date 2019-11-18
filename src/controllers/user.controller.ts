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
    const newUser = new User(user);

    return await newUser.save();
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
  public static async login(userId: string, password: string) {
    // CHECK USER EXISTS
    const exists: boolean = await this.exists(userId);
    if (!exists) {
      throw new Error('User does not exist');
    }

    const user: IUser = (await User.findOne({ userId: userId })) as IUser;
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
      logger.info(payload);
      return payload;
    } else {
      throw new Error('Passwords do not match');
    }
  }
  public static async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ) {
    let user: IUser = (await User.findOne({ userId: userId })) as IUser;
    let comparison = await bcrypt.compare(oldPassword, user.password);
    if (comparison !== true) {
      throw new Error('Password incorrect');
    }
    user.password = newPassword;
    return user.save();
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
