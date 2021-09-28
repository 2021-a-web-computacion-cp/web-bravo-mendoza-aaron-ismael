import {
    IsBoolean,
    IsDecimal,
    IsInt,
    IsNotEmpty, IsNumber,
    IsString,
    Max,
    MaxLength,
    Min,
    MinLength
} from "class-validator";

export class PlanetaCrearDto{

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(15)
    nombre: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1901)
    @Max(2021)
    descubrimiento: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(4000)
    diametro: number;

    @IsNotEmpty()
    @IsBoolean()
    habitado: boolean;

    @IsNotEmpty()
    @IsNumber()
    gravedad: number;

}