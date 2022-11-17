import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '@/schemas/user.module';
import { UsersController } from './users.controller';
import { UsersService } from '@/users/users.service';
import { UsersResolver } from '@/users/users.resolver';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
  providers: [UsersService, UsersResolver],
  controllers: [UsersController],
})
export class UsersModule {}

@ObjectType()
export class UsersModel {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}
