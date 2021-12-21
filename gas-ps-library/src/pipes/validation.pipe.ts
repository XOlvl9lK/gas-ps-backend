import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { LoggerService } from '../logger/logger.service';
import { Exception } from '../exceptions/exception';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToInstance(metadata.metatype, value)
    if (obj) {
      const errors = await validate(obj, { skipMissingProperties: true })

      if (errors.length) {
        let message = errors.map(e => {
          return `${e.property} - ${Object.values(e.constraints).join(', ')}`
        }).join('. ')
        LoggerService.warn(message, 'VALIDATION')
        Exception.BadRequest(null, message)
      }
    }
    return value;
  }
}