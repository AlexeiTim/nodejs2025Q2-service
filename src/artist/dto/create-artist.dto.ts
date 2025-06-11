import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateArtistDto {
  @IsBoolean()
  grammy: boolean;

  @IsNotEmpty()
  name: string;
}
