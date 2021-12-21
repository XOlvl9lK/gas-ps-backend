import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service'
import { ExceptionsFilter } from '../../gas-ps-library/src/exceptions/exceptions.filter'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionsFilter())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT || 3000, () => {
    LoggerService.log('Nest application started')
  });
}
bootstrap();
