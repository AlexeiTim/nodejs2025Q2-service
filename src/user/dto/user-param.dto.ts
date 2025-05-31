import { IsUUID } from 'class-validator';

export class UserParamDto {
  @IsUUID()
  id: string;
}
