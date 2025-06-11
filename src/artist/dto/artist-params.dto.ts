import { IsUUID } from 'class-validator';

export class ArtistParamsDto {
  @IsUUID()
  id: string;
}
