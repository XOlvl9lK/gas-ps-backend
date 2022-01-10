import { Module } from '@nestjs/common';
import { TicketModule } from './modules/ticket/ticket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/Ticket';
import { FilesModule } from './modules/files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TicketModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST || 'localhost',
      port: Number(process.env.PG_PORT) || 5432,
      username: process.env.PG_USER || 'postgres',
      password: process.env.PG_PASSWORD || 'root',
      database: process.env.PG_DATABASE || 'gas-ps',
      entities: [Ticket],
      synchronize: true,
    }),
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads')
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
