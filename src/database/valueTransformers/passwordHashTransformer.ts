import toBcryptHash from '../../common/utils/toBcryptHash';

import type { ValueTransformer } from 'typeorm';

class PasswordHashTransformer implements ValueTransformer {
  to(value: string): string {
    return toBcryptHash(value);
  }

  from(value: string): string {
    return value;
  }
}

export default PasswordHashTransformer;
