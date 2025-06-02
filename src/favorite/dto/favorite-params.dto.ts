import { IsUUID } from 'class-validator';

export class FavoriteParamsDto {
  @IsUUID()
  id: string;
}
