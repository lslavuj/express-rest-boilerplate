import type Context from '../../src/common/types/Context';

export {};

declare global {
  namespace Express {
    export interface Request {
      context: Context;
    }
  }
}
