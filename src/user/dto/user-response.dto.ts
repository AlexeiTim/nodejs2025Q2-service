import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  login: string;

  @Expose()
  version: number;

  @Expose()
  @Transform(({ value }) => value.getTime())
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => value.getTime())
  updatedAt: Date;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
