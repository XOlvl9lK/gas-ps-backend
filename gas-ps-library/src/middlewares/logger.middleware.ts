import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const { method, originalUrl, hostname } = req;
    const logRequestMessage = `REQUEST from ${hostname} ${method} ${originalUrl}`
    LoggerService.log(logRequestMessage, 'HTTP')

    res.on('finish', () => {

      const { statusCode, statusMessage } = res;

      const logResponseMessage = `RESPONSE: Status Code: ${statusCode} Status Message: ${statusMessage}`;

      return LoggerService.log(logResponseMessage, 'HTTP');
    });

    next();
  }
}