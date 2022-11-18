import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersInput } from '@/users/users.input';
import { UsersService } from '@/users/users.service';
import { UsersModel } from '@/users/users.module';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UsersModel])
  async getUsers() {
    return await this.usersService.getUsersGraphQL();
  }

  @Query(() => UsersModel)
  async getUser(
    @Args('id', { type: () => String }) id: string,
  ): Promise<UsersModel> {
    return await this.usersService.getUserGraphQL({ id: id });
  }

  @Mutation(() => UsersModel)
  createUser(@Args('input') input: UsersInput): UsersModel {
    return {
      id: '2',
      ...input,
    };
  }
}
