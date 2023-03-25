import * as yup from 'yup';

import parseDateString from '../../../common/parsers/transformFunctions/parseDateString';

import type { InferType } from 'yup';

const today = new Date();

const bodySchema = yup
  .object({
    firstName: yup.string().max(100).trim().required(),
    lastName: yup.string().max(100).trim().required(),
    birthDate: yup.date().transform(parseDateString).max(today).required(),
  })
  .required();

export type PersonCreateData = InferType<typeof bodySchema>;

export default bodySchema;
