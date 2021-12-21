import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsDefined()
  @IsString({ message: 'Название должно быть строкой' })
  title: string;

  @IsString({ message: 'Навзвание должно быть строкой' })
  content: string;

  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'Раздел должен быть числом' })
  chapterId: number
}

export class UpdateArticleDto {
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'Id должен быть числом' })
  id: number;

  @IsString({ message: 'Название должно быть строкой' })
  title: string;

  @IsString({ message: 'Навзвание должно быть строкой' })
  content: string;

  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'Раздел должен быть числом' })
  chapterId: number
}