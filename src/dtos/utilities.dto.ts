import { IsString, IsInt, IsBoolean, IsNotEmpty, IsArray } from 'class-validator';

export class PaginationDto {
  @IsInt()
  public limit: number;

  @IsInt()
  public skip: number;
}
