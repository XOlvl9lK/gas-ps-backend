import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { CreateChapterDto, UpdateChapterDto } from './chapterDto';

@Controller('chapter')
export class ChapterController {
  constructor(private chapterService: ChapterService) {}

  @Get()
  async getAll() {
    return await this.chapterService.getAll()
  }

  @Post()
  async create(@Body() chapterDto: CreateChapterDto) {
    return await this.chapterService.create(chapterDto)
  }

  @Put()
  async update(@Body() chapterDto: UpdateChapterDto) {
    return await this.chapterService.update(chapterDto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.chapterService.delete(id)
  }
}
