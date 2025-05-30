import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @MinLength(1)
  name: string;
  artistId: string | null;
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
