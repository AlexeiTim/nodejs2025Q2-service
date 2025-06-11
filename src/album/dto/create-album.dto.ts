import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  year: number;

  @IsUUID()
  @IsOptional()
  artistId: string | null;
}
