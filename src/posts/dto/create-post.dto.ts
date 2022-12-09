import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDefined, Matches } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  title: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  @Matches(/^([A-Za-z0-9\-]{3,})$/)
  slug: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  content: string;
}
