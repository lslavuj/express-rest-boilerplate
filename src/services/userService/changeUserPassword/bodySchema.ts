import * as yup from 'yup';

import passwordSchema from '../../../common/schemas/passwordSchema';

import type { InferType } from 'yup';

const bodySchema = yup
  .object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
  })
  .required();

export type ChangeUserPasswordData = InferType<typeof bodySchema>;

export default bodySchema;
