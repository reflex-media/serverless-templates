"use strict";

export default class ValidationError extends Error {
  constructor(message, errorCode = 40001000, httpStatusCode = 400, extra) {
    super();
    this.name = "ValidationError";
    this.message = message;

    Error.captureStackTrace(this, this.constructor);

    if (httpStatusCode) this.statusCode = httpStatusCode;
    if (errorCode) this.code = errorCode;
    if (extra) this.extra = extra;
  }
}
