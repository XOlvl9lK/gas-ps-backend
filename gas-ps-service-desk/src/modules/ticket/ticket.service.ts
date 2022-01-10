import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from '../../entities/Ticket';
import { ILike, In, Repository } from 'typeorm';
import { AsyncTryCatch } from '../../common/decorators/asyncTryCatch.decorator';
import { CreateTicketDto, UpdateTicketDto } from './ticket.dto';
import { Exception } from '../../exceptions/exception';
import { TicketQuery } from './ticket.controller';
import { TryCatch } from '../../common/decorators/tryCatch.decorator';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>
  ) {}

  @AsyncTryCatch(TicketService.name)
  async getAll({range, sort, filter}: TicketQuery) {
    const [result, total] = await this.ticketRepository.findAndCount({
      ...(range ? { skip: range[0] * range[1], take: range[1] } : {}),
      where: {
        ...this.processFilterData(filter),
      },
      order: {
        ...(sort ? { [sort[0]]: sort[1] } : {})
      }
    })
    return { result, total }
  }

  @AsyncTryCatch(TicketService.name)
  async getById(id: string) {
    return await this.ticketRepository.findOne({
      where: { id }
    })
  }

  @AsyncTryCatch(TicketService.name)
  async create(ticketDto: CreateTicketDto) {
    const ticket = this.ticketRepository.create({
      ...ticketDto
    })
    return this.ticketRepository.save(ticket)
  }

  @AsyncTryCatch(TicketService.name)
  async update(ticketDto: UpdateTicketDto, id: string) {
    let ticket = await this.ticketRepository.findOne({ where: { id }})
    if (ticket) {
      ticket.title = ticketDto.title
      ticket.email = ticketDto.email
      ticket.message = ticketDto.message
      ticket.file = ticketDto.file
      ticket.isOpen = ticketDto.isOpen
      return await this.ticketRepository.save(ticket)
    }
    Exception.BadRequest(null, 'Ticket с таким id не найден')
  }

  @AsyncTryCatch(TicketService.name)
  async updateAll(ticketDto: UpdateTicketDto[], filter: TicketQuery['filter']) {
    const { result: tickets } = await this.getAll({ filter })
    return await Promise.all(tickets.map(ticket => {
      ticket = {
        ...ticket,
        ...(ticketDto.find(dto => dto.id === ticket.id) || {})
      }
      return this.ticketRepository.save(ticket)
    }))
  }

  @AsyncTryCatch(TicketService.name)
  async delete(id: string) {
    return await this.ticketRepository.delete(id)
  }

  @AsyncTryCatch(TicketService.name)
  async deleteAll(filter: TicketQuery['filter']) {
    return await this.ticketRepository.delete(filter.id)
  }

  @TryCatch(TicketService.name)
  private processFilterData(filter: any): TicketQuery['filter'] {
    for (let key in filter) {
      if (Array.isArray(filter[key])) {
        filter[key] = In(filter[key])
      }
      if (key === 'title' || key === 'message') {
        filter[key] = ILike(filter[key])
      }
    }
    return filter;
  }
}
