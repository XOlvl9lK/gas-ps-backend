import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto, UpdateArticleDto } from './article.dto';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  async getAll(
    @Query('search') search: string,
  ) {
    return await this.articleService.getAll(search)
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.articleService.getById(id)
  }

  @Post()
  async create(@Body() articleDto: CreateArticleDto) {
    return await this.articleService.create(articleDto)
  }

  @Put()
  async update(@Body() articleDto: UpdateArticleDto) {
    return await this.articleService.update(articleDto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.articleService.delete(id)
  }
}
