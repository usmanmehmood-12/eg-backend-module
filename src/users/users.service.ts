import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(
    email: string,
    name: string,
    password: string,
  ): Promise<User> {
    if (!email || !name || !password) {
      throw new Error('Missing required fields');
    }

    const createdUser = new this.userModel({ email, name, password });
    try {
      return await createdUser.save();
    } catch (error) {
      this.logger.error('Error creating user:', error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    if (!email) {
      throw new Error('Missing required field: email');
    }

    this.logger.log(`Searching for user with email: ${email}`);
    try {
      return await this.userModel.findOne({ email }).exec();
    } catch (error) {
      this.logger.error('Error finding user by email:', error);
      throw error;
    }
  }
}
