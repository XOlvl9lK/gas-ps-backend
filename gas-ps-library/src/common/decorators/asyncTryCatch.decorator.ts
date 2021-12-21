
import { LoggerService } from '../../logger/logger.service'
import { Exception } from '../../exceptions/exception'

export function AsyncTryCatch(context: string) {
  return function(
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    let method = descriptor.value!;

    descriptor.value = async function tryCatchWrapper () {
      try {
        return await method.apply(this, arguments);
      } catch (e: any) {
        if (e instanceof Exception) {
          LoggerService.error(e.message, e?.stack, context + '->' + propertyName)
          throw e;
        }
        LoggerService.error('Internal server error - ' + e, e?.stack, context + '->' + propertyName)
        Exception.InternalError(e)
      }
    };

    return descriptor;
  }
}