import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service'

@Injectable()
export class LogsMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    res.on('finish', () => {
      const { method, originalUrl } = req;
      const { statusCode, statusMessage } = res;

      const logMessage = `${method} ${originalUrl} Status Code: ${statusCode} Status Message: ${statusMessage}`;

      return LoggerService.log(logMessage, 'HTTP');
    });

    next();
  }
}
