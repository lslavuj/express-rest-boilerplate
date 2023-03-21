import { ValidationError } from 'yup';

import logger from '../utils/logger';

import type { Request } from 'express';
import type { AnyObjectSchema } from 'yup';

const parseQuery = async <T = unknown>(request: Request, schema: AnyObjectSchema): Promise<T> => {
  try {
    return (await schema.noUnknown().validate(request.query, { abortEarly: false })) as T;
  } catch (error: unknown) {
    logger.error(error);

    const message = error instanceof ValidationError ? JSON.stringify(error.errors) : undefined;

    throw new Error(message);
  }
};

export default parseQuery;
