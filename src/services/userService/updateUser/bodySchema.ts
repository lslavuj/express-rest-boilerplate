import * as yup from 'yup';

import parseDateString from '../../../common/parsers/transformFunctions/parseDateString';

import type { InferType } from 'yup';

const today = new Date();

const bodySchema = yup
  .object({
    firstName: yup.string().max(100).trim().nullable().notRequired(),
    lastName: yup.string().max(100).trim().nullable().notRequired(),
    birthDate: yup.date().transform(parseDateString).max(today).nullable().notRequired(),
    email: yup.string().email().trim().nullable().notRequired(),
  })
  .required();

export type UserUpdateData = InferType<typeof bodySchema>;

export default bodySchema;
