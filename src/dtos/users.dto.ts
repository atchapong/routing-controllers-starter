import { IsEmail, IsString, IsEnum, IsArray, IsBoolean, IsNumber, IsObject } from 'class-validator';

export class LoginUserDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;
}

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public username: string;

  @IsString()
  public tel: string;

  @IsString()
  public bank_name: string;

  @IsString()
  public bank_account_name: string;

  @IsString()
  public bank_account_number: string;

  @IsBoolean()
  public accept_condition: boolean;

}

export class UpdateUserDto {
  @IsEmail()
  public email: string;

  public password?: string;

  @IsString()
  public username: string;

  @IsBoolean()
  is_active: boolean;
}


