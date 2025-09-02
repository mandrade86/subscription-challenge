import { IsEmail, IsString } from 'class-validator';

export class SignupDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
