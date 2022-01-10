import { Exception } from '../../exceptions/exception'
import { LoggerService } from '../../logger/logger.service'

export function TryCatch(context: string) {
  return function(
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    let method = descriptor.value!;

    descriptor.value = function tryCatchWrapper () {
      try {
        return method.apply(this, arguments);
      } catch (e: any) {
        LoggerService.error('Internal server error - ' + e, e?.stack, context + '->' + propertyName)
        Exception.InternalError(e)
      }
    };

    return descriptor;
  }
}