import { Module } from '@nestjs/common';
import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chapter } from '../../entities/Chapter';

@Module({
  controllers: [ChapterController],
  providers: [ChapterService],
  imports: [
    TypeOrmModule.forFeature([Chapter])
  ]
})
export class ChapterModule {}
