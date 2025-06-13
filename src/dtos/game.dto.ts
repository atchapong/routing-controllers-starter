
import { IsString, IsArray, IsNumber } from 'class-validator';
export class CreateGameDto {
    @IsString()
    public name: string;

    @IsString()
    public detail: string;

    @IsString()
    public url: string;

    @IsArray()
    public bet_rate: string;

    @IsNumber()
    public bet_price_min: number;
    
    @IsNumber()
    public bet_price_max: number;

    @IsNumber()
    public max_round: number;

    @IsNumber()
    public round_per_min: number;


}
