import HttpStatusCode from '../enums/HttpStatusCode';
import AppError from '../errors/AppError';

const validatePassword = (password: string): void => {
  if (password.length < 8 || password.length > 64) {
    throw new AppError(
      HttpStatusCode.BAD_REQUEST,
      'Password length must be between 8 - 64 characters!',
    );
  }

  if (!/\p{Ll}/u.exec(password)) {
    throw new AppError(
      HttpStatusCode.BAD_REQUEST,
      'Password must have at least one lowercase letter!',
    );
  }

  if (!/\p{Lu}/u.exec(password)) {
    throw new AppError(
      HttpStatusCode.BAD_REQUEST,
      'Password must have at least one uppercase letter!',
    );
  }

  if (!/\d/u.exec(password)) {
    throw new AppError(HttpStatusCode.BAD_REQUEST, 'Password must have at least one number!');
  }

  if (!/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/u.exec(password)) {
    throw new AppError(
      HttpStatusCode.BAD_REQUEST,
      'Password must have at least one special character!',
    );
  }

  if (/(?<repeatingCharacter>.)\1\1/u.exec(password)) {
    throw new AppError(
      HttpStatusCode.BAD_REQUEST,
      'Password can have maximum of 2 same consecutive characters!',
    );
  }
};

export default validatePassword;
