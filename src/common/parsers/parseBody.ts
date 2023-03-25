import { isEmpty } from 'lodash';
import { ValidationError } from 'yup';

import type { Request } from 'express';
import type * as yup from 'yup';

const parseBody = async <T = unknown>(request: Request, schema: yup.AnyObject): Promise<T> => {
  try {
    const validatedSchema = (await schema.validate(request.body, {
      abortEarly: false,
      stripUnknown: true,
    })) as T;

    if (isEmpty(validatedSchema)) {
      throw new Error("Body can't be empty");
    }

    return validatedSchema;
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      throw error;
    }

    throw new Error((error as Error).message || undefined);
  }
};

export default parseBody;
