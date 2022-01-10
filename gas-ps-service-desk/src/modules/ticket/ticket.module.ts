import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from '../../entities/Ticket';

@Module({
  providers: [TicketService],
  controllers: [TicketController],
  imports: [
    TypeOrmModule.forFeature([Ticket])
  ]
})
export class TicketModule {}
