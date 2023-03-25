import { ValidationError } from 'yup';

import type { Request } from 'express';
import type * as yup from 'yup';

const parsePath = async <T = unknown>(request: Request, schema: yup.AnyObject): Promise<T> => {
  try {
    return (await schema.noUnknown().validate(request.params, { abortEarly: false })) as T;
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      throw error;
    }

    throw new Error((error as Error).message || undefined);
  }
};

export default parsePath;
