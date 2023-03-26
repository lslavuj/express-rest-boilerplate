import HttpStatusCode from '../enums/HttpStatusCode';
import AppError from '../errors/AppError';

type SystemVariables = { [key: string]: string };

const getEnvironmentVariables = (
  variables: string[] | string,
  areRequired = true,
): SystemVariables => {
  const missingEnvironmentVariables = [];
  const foundEnvironmentVariables: SystemVariables = {};

  for (const variable of Array.isArray(variables) ? variables : [variables]) {
    const {
      env: { [variable]: value },
    } = process;

    if (!value) {
      missingEnvironmentVariables.push(variable);
    }

    foundEnvironmentVariables[variable] = value ?? '';
  }

  if (areRequired && missingEnvironmentVariables.length) {
    throw new AppError(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      `Missing environment variable${
        missingEnvironmentVariables.length > 1 ? 's' : ''
      }: ${missingEnvironmentVariables.join(', ')}!`,
    );
  }

  return foundEnvironmentVariables;
};

export default getEnvironmentVariables;
