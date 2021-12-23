import { Module } from '@nestjs/common';
import { NodesController } from './nodes.controller';
import { NodesService } from './nodes.service';
import { ArticleModule } from '../article/article.module';
import { ChapterModule } from '../chapter/chapter.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chapter } from '../../entities/Chapter';
import { Article } from '../../entities/Article';

@Module({
  controllers: [NodesController],
  providers: [NodesService],
  imports: [
    TypeOrmModule.forFeature([Chapter, Article])
  ]
})
export class NodesModule {}
