import * as yup from 'yup';

import type { InferType } from 'yup';

const pathSchema = yup
  .object({
    id: yup.number().positive().required(),
  })
  .required();

export type UserDeleteData = InferType<typeof pathSchema>;

export default pathSchema;
