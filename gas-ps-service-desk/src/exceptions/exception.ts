import { HttpException, HttpStatus } from '@nestjs/common'

export class Exception extends HttpException {
  constructor(
    public object: Error | null,
    status: HttpStatus | number,
    message: string = `An error occurred, for more information, see 'error'.`
  ) {
    super(message, status)
  }

  static InternalError(e: Error) {
    throw new Exception(
      e,
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Internal server error'
    )
  }

  static BadRequest(e: Error, message: string = 'Bad Request') {
    throw new Exception(
      e,
      HttpStatus.BAD_REQUEST,
      message
    )
  }

  static Unauthorized(e: Error, message: string = 'Unauthorized') {
    throw new Exception(
      e,
      HttpStatus.UNAUTHORIZED,
      message
    )
  }
}