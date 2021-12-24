import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './exceptions/exceptions.filter';
import { LoggerService } from './logger/logger.service';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalFilters(new ExceptionsFilter())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3001, () => {
    LoggerService.log('Server started on port 3001', 'NEST')
  });
}
bootstrap();
