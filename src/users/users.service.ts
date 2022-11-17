import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@/schemas/user.module';
import { UsersModel } from '@/users/users.module';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}
  async createUser(
    name: string,
    username: string,
    password: string,
  ): Promise<User> {
    return this.userModel.create({
      name,
      username,
      password,
    });
  }
  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }

  async getUserGraphQL(query: object): Promise<UsersModel> {
    return this.userModel.findOne(query);
  }
}
