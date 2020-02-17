import { AuthenticationError } from 'apollo-server-core';
import bcrypt from 'bcryptjs';
import IUser from 'interfaces/user.interface';
import jwt from 'jsonwebtoken';

import { logger } from '../config/logger';
import UserController from '../controllers/user.controller';
import User from '../models/user.model';

export default class AuthController {
  // LOG IN
  public static async login(userId: string, password: string) {
    // Check if user exists
    const exists: boolean = await UserController.exists(userId);
    if (!exists) {
      throw new Error('User does not exist');
    }
    // Compare passwords. Return payload or throw error.
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
      throw new Error('Password is incorrect');
    }
  }

  // CHANGE PASSWORD
  public static async changePassword(userId: string, password: string, newPassword: string) {
    // Check if user exists
    const exists: boolean = await UserController.exists(userId);
    if (!exists) {
      throw new Error('User does not exist');
    }
    // Compare passwords. Change and return result or throw error.
    let user: IUser = (await User.findOne({ userId: userId })) as IUser;
    let isMatch: boolean = await bcrypt.compare(password, user.password);
    if (isMatch !== true) {
      throw new Error('Password is incorrect');
    }
    // Check that new password is different
    if (password === newPassword) {
      throw new Error('Cannot use the same password');
    }
    // Hash new password and update
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(newPassword, salt);
    await User.findOneAndUpdate(
      { userId: user.userId },
      {
        $set: {
          password: hash
        }
      },
      { upsert: true }
    );
    return `Password changed for user: ${user.userId}`;
  }
}
