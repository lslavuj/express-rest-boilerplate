import type HttpStatusCode from '../enums/HttpStatusCode';

class AppError<T> extends Error {
  readonly statusCode: HttpStatusCode;

  readonly message: string;

  readonly originalError: unknown;

  readonly data: T | undefined;

  constructor(
    statusCode: HttpStatusCode,
    message: string,
    errorDetails: {
      originalError?: unknown;
      data?: T;
    },
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    const { originalError, data } = errorDetails;

    this.message = message;
    this.statusCode = statusCode;
    this.originalError = originalError;
    this.data = data;

    Error.captureStackTrace(this);
  }
}

export default AppError;
