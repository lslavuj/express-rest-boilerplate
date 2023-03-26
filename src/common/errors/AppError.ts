import type HttpStatusCode from '../enums/HttpStatusCode';

type ErrorDetails<T> = {
  originalError?: unknown;
  data: T;
};

class AppError<T> extends Error {
  readonly statusCode: HttpStatusCode;

  readonly message: string;

  readonly originalError: unknown;

  readonly data: T | undefined | null;

  constructor(statusCode: HttpStatusCode, message: string, errorDetails?: ErrorDetails<T>) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    const { originalError = null, data = null } = (errorDetails as ErrorDetails<T>) || {};

    this.message = message;
    this.statusCode = statusCode;
    this.originalError = originalError;
    this.data = data;

    Error.captureStackTrace(this);
  }
}

export default AppError;
