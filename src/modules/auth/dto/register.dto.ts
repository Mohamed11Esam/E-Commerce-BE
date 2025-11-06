import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    userName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Transform(({ value }) => {return new Date(value)})
    @IsDate()
    dob: Date;

    @IsOptional()
    @IsString()
    otp: string;

    @IsOptional()
    @IsDate()
    otpExpiration: Date;

    @IsOptional()
    @IsBoolean()
    isVerified: boolean;
}
