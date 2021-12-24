import { Injectable } from '@nestjs/common';
import { AsyncTryCatch } from '../../common/decorators/asyncTryCatch.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Chapter } from '../../entities/Chapter';
import { Repository } from 'typeorm';
import { Article } from '../../entities/Article';
import { NodesDto } from './nodes.dto';

@Injectable()
export class NodesService {
  constructor(
    @InjectRepository(Chapter)
    private chapterRepository: Repository<Chapter>,
    @InjectRepository(Article)
    private articleRepository: Repository<Article>
  ) {}

  @AsyncTryCatch(NodesService.name)
  async getAll() {
    const [chapters, articles] = await Promise.all([
      this.chapterRepository.find({ select: ['id', 'title', 'parentId'] }),
      this.articleRepository.find({ select: ['id', 'title', 'chapterId' ] })
    ])

    return [...chapters, ...articles].map(node => new NodesDto(node))
  }
}
