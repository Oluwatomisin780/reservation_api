import {
  IsString,
  IsStrongPassword,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
