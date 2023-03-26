import * as yup from 'yup';

import validatePassword from '../utils/validatePassword';

import type AppError from '../errors/AppError';

const passwordSchema = yup
  .string()
  .required()
  .test('validate-password', (value, { createError, path }) => {
    try {
      validatePassword(String(value));
      return true;
    } catch (error: unknown) {
      return createError({
        message: (error as AppError<undefined>).message,
        path,
      });
    }
  });

export default passwordSchema;
