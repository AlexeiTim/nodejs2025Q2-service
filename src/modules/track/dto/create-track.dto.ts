import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @IsUUID()
  @IsOptional()
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
