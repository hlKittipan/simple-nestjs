import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsString()
  name: string;

  @IsNotEmpty()
  password: string;
}
