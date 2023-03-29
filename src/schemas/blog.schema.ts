import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from '@schemas/user.schema';
import { Transform } from 'class-transformer';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  slug: string;

  @Prop()
  tags: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ default: false })
  deleted: boolean;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
// Set a default filter of { deleted: false } for all find queries
const deletedFalsePlugin = (schema: any) => {
  schema.pre('find', function () {
    this.where({ deleted: false });
  });
};

BlogSchema.plugin(deletedFalsePlugin);
