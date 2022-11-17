import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersModel } from '@/users/users.model';
import { UsersInput } from '@/users/users.input';

@Resolver('Users')
export class UsersResolver {
  @Query(() => UsersModel)
  getBook(): UsersModel {
    return {
      id: '1',
      name: 'BeforeSecond',
      username: 'dsfsdfsdf',
      password: 'd',
    };
  }

  @Mutation(() => UsersModel)
  createBook(@Args('input') input: UsersInput): UsersModel {
    return {
      id: '2',
      ...input,
    };
  }
}
