import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog, BlogDocument } from '@/schemas/blog.schema';
import { User, UserDocument } from '@/schemas/user.schema';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  create(createBlogDto: CreateBlogDto) {
    const createdBlog = new this.blogModel(createBlogDto);
    return createdBlog.save();
  }

  findAll() {
    return this.blogModel.find().populate('author').exec();
  }

  findOne(id: number) {
    return this.blogModel.findById(id).populate('author').exec();
  }

  async update(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    return this.blogModel
      .findByIdAndUpdate(id, { $set: updateBlogDto }, { new: true })
      .populate('author');
  }

  remove(id: number) {
    return this.blogModel
      .findByIdAndUpdate(id, { deleted: true }, { new: true })
      .exec();
  }
}