import bcrypt from 'bcryptjs';

const toBcryptHash = async (plainString: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedString = await bcrypt.hash(plainString, salt);

  return hashedString;
};

export default toBcryptHash;
