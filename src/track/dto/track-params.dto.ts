import { IsUUID } from 'class-validator';

export class TrackParamsDto {
  @IsUUID()
  id: string;
}
