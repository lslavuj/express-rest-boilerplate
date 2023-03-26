import * as yup from 'yup';

import passwordSchema from '../../../common/schemas/passwordSchema';

import type { InferType } from 'yup';

const bodySchema = yup
  .object({
    email: yup.string().email().trim().required(),
    password: passwordSchema,
    rememberMe: yup.boolean().nullable().notRequired().default(false),
  })
  .required();

export type LoginData = InferType<typeof bodySchema>;

export default bodySchema;
