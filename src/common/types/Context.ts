import type User from '../../database/models/User';

interface Context {
  user: User;
}

export default Context;
