import { ERROR_EXCEPTION } from 'Constants/errorCodes';

export default class ErrorException extends Error {
  constructor(
    message,
    errorCode = ERROR_EXCEPTION,
    httpStatusCode = 400,
    extra
  ) {
    super();
    this.name = 'ErrorException';
    this.message = message;
    this.statusCode = httpStatusCode;
    this.code = errorCode;

    Error.captureStackTrace(this, this.constructor);

    if (extra) this.extra = extra;
  }
}
