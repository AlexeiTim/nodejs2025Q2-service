import { IsUUID } from 'class-validator';

export class AlbumParamsDto {
  @IsUUID()
  id: string;
}
