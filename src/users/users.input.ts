import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UsersInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}
