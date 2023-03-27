import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '@/schemas/user.schema';
export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog {
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
