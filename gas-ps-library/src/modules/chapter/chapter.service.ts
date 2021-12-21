import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chapter } from '../../entities/Chapter';
import { Repository } from 'typeorm';
import { CreateChapterDto, UpdateChapterDto } from './chapterDto';
import { Exception } from '../../exceptions/exception';
import { AsyncTryCatch } from '../../common/decorators/asyncTryCatch.decorator';

@Injectable()
export class ChapterService {
  constructor(
    @InjectRepository(Chapter)
    private chapterRepository: Repository<Chapter>,
  ) {
  }

  @AsyncTryCatch(ChapterService.name)
  async getAll() {
    return await this.chapterRepository.find();
  }

  @AsyncTryCatch(ChapterService.name)
  async create(chapterDto: CreateChapterDto) {
    const parent = await this.chapterRepository.findOne(
      { where: { id: chapterDto?.parentId } });
    const chapter = this.chapterRepository.create({
      title: chapterDto.title,
      parentId: parent?.id || null
    });
    return await this.chapterRepository.save(chapter);
  }

  @AsyncTryCatch(ChapterService.name)
  async update(chapterDto: UpdateChapterDto) {
    const [chapter, parent] = await Promise.all([
      this.chapterRepository.findOne({ where: { id: chapterDto.id } }),
      this.chapterRepository.findOne({ where: { id: chapterDto?.parentId } }),
    ]);
    if (chapter) {
      chapter.title = chapterDto.title;
      chapter.parentId = parent?.id || null;
      return await this.chapterRepository.save(chapter);
    }
    Exception.BadRequest(null, 'Раздел с таким id не найден');
  }

  @AsyncTryCatch(ChapterService.name)
  async delete(id: string) {
    return await this.chapterRepository.delete(id);
  }
}
