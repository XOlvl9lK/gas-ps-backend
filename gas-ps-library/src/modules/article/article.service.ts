import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../../entities/Article';
import { ILike, Repository } from 'typeorm';
import { AsyncTryCatch } from '../../common/decorators/asyncTryCatch.decorator';
import { CreateArticleDto, UpdateArticleDto } from './article.dto';
import { Exception } from '../../exceptions/exception';
import { Chapter } from '../../entities/Chapter';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(Chapter)
    private chapterRepository: Repository<Chapter>,
  ) {
  }

  @AsyncTryCatch(ArticleService.name)
  async getAll(search?: string) {

    return await this.articleRepository.find({
      where: search ? [
        { title: ILike(`%${search}%`) },
        { content: ILike(`%${search}%`) },
      ] : [],
    });
  }

  @AsyncTryCatch(ArticleService.name)
  async getById(id: string) {
    return await this.articleRepository.findOne({ where: { id } });
  }

  @AsyncTryCatch(ArticleService.name)
  async create(articleDto: CreateArticleDto) {
    const chapter = await this.chapterRepository.findOne(
      { where: { id: articleDto.chapterId } });
    let article;
    if (chapter) {
      article = this.articleRepository.create({
        title: articleDto.title,
        content: articleDto.content,
        chapter,
      });
    } else {
      article = this.articleRepository.create({
        title: articleDto.title,
        content: articleDto.content,
      });
    }
    return await this.articleRepository.save(article);
  }

  @AsyncTryCatch(ArticleService.name)
  async update(articleDto: UpdateArticleDto) {
    const [article, chapter] = await Promise.all([
      this.articleRepository.findOne({ where: { id: articleDto.id } }),
      this.chapterRepository.findOne({ where: { id: articleDto.chapterId } }),
    ]);
    if (article) {
      article.title = articleDto.title;
      article.content = articleDto.content;
      article.chapter = chapter || null;
      return await this.articleRepository.save(article);
    }
    Exception.BadRequest(null, 'Статья с таким id не найдена');
  }

  @AsyncTryCatch(ArticleService.name)
  async delete(id: string) {
    return await this.articleRepository.delete(id);
  }
}
