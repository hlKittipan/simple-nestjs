import { Field, ID, ObjectType } from '@nestjs/graphql';

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
