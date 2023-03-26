import bcrypt from 'bcryptjs';

const toBcryptHash = (plainString: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedString = bcrypt.hashSync(plainString, salt);

  return hashedString;
};

export default toBcryptHash;
