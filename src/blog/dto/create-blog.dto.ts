import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  title: string;

  @IsString()
  content: string;

  @IsNotEmpty()
  slug: string;
}
