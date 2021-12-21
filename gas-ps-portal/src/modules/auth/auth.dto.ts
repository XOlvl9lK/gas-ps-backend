import { IsNotEmpty, IsString, Min } from 'class-validator'

export class AuthDto {
  @IsNotEmpty({ message: 'Логин должен существовать'})
  @IsString({ message: 'Логин должен быть строкой'})
  login: string;

  @IsNotEmpty({ message: 'Пароль должен существовать'})
  @Min(6, { message: 'Длина пароля должна быть больше 6 символов'})
  password: string;
}