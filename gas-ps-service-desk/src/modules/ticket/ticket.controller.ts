import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Query, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto, UpdateTicketDto } from './ticket.dto';
import { Ticket } from '../../entities/Ticket';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../../common/helpers/diskStorage';

export interface TicketQueryString {
  sort?: string,
  range?: string,
  filter?: string
}

export interface TicketQuery {
  sort?: [keyof Ticket, 'ASC' | 'DESC'],
  range?: [number, number],
  filter?: {
    [K in keyof Partial<Ticket>]: string | string[]
  }
}

@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Get()
  async getAll(@Query() query: TicketQueryString) {
    return await this.ticketService.getAll(this.processQueryData(query));
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.ticketService.getById(id)
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: storage }))
  async create(@Body() ticketDto: CreateTicketDto, @UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return await this.ticketService.create({ ...ticketDto, file: file.filename })
  }

  @Put('/:id')
  async update(@Body() ticketDto: UpdateTicketDto, @Param('id') id: string) {
    return await this.ticketService.update(ticketDto, id)
  }

  @Put()
  async updateAll(@Body() ticketDto: UpdateTicketDto[], @Query('filter') filter: TicketQuery['filter']) {
    return await this.ticketService.updateAll(ticketDto, filter);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.ticketService.delete(id)
  }

  @Delete()
  async deleteAll(@Query('filter') filter: TicketQuery['filter']) {
    return await this.ticketService.deleteAll(this.processQueryData(filter))
  }

  private processQueryData(query: any) {
    for (let key in query) {
      query[key] = JSON.parse(query[key])
    }
    return query
  }
}
