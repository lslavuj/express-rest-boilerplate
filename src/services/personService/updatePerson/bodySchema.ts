import * as yup from 'yup';

import parseDateString from '../../../common/parsers/transformFunctions/parseDateString';

import type { InferType } from 'yup';

const today = new Date();

const bodySchema = yup
  .object({
    firstName: yup.string().max(100).nullable().notRequired(),
    lastName: yup.string().max(100).nullable().notRequired(),
    birthDate: yup.date().transform(parseDateString).max(today).nullable().notRequired(),
  })
  .required();

export type PersonUpdateData = InferType<typeof bodySchema>;

export default bodySchema;
