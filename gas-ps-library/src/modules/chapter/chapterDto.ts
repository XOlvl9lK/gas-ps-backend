import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateChapterDto {
  @IsDefined()
  @IsString({ message: 'Название должно быть строкой' })
  title: string;

  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'Родитель должен быть числом' })
  parentId?: number;
}

export class UpdateChapterDto {
  @IsDefined()
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'Id должен быть числом' })
  id: number;

  @IsDefined()
  @IsString({ message: 'Название должно быть строкой' })
  title: string;

  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'Родитель должен быть числом' })
  parentId?: number;
}