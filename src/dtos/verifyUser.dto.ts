
import { IsString, IsArray } from 'class-validator';
export class CreateVerifyUserDto {
    @IsString()
    public user_id: string;
}
