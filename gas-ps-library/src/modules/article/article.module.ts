import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../../entities/Article';
import { Chapter } from '../../entities/Chapter';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  imports: [
    TypeOrmModule.forFeature([Article, Chapter])
  ],
  exports: [ArticleService]
})
export class ArticleModule {}
