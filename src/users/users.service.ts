import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    const created = new this.userModel(createUserDto);
    return created.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: number) {
    return this.userModel.findById(id).exec();
  }

  getUser(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(id, { $set: updateUserDto }, { new: true })
      .exec();
  }

  remove(id: number) {
    return this.userModel
      .findByIdAndUpdate(id, { deleted: true }, { new: true })
      .exec();
  }

  async getUserGraphQL(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }
  async getUsersGraphQL(): Promise<User[]> {
    return this.userModel.find();
  }
}
