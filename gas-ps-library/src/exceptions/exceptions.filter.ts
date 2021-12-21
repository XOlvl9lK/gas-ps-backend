import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Response } from 'express';
import { Exception } from './exception'

@Catch(Exception)
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: Exception, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: exception?.object?.stack,
    })
  }
}