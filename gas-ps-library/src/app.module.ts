import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChapterModule } from './modules/chapter/chapter.module';
import { ArticleModule } from './modules/article/article.module';
import { Article } from './entities/Article';
import { Chapter } from './entities/Chapter';
import { NodesModule } from './modules/nodes/nodes.module';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST || 'localhost',
      port: Number(process.env.PG_PORT) || 5432,
      username: process.env.PG_USER || 'postgres',
      password: process.env.PG_PASSWORD || 'root',
      database: process.env.PG_DATABASE || 'gas-ps',
      entities: [Article, Chapter],
      synchronize: true,
    }),
    ChapterModule,
    ArticleModule,
    NodesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
