import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  name?: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  deleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
// Set a default filter of { deleted: false } for all find queries
const deletedFalsePlugin = (schema: any) => {
  schema.pre('find', function () {
    this.where({ deleted: false });
  });
};

UserSchema.plugin(deletedFalsePlugin);
