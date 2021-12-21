import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './exceptions/exceptions.filter';
import { LoggerService } from './logger/logger.service';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionsFilter())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000, () => {
    LoggerService.log('Server started on port 3000', 'NEST')
  });
}
bootstrap();
