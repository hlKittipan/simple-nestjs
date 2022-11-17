import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UsersModel {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String)
  username: string;

  @Field(() => Number, { nullable: true })
  password: string;
}
