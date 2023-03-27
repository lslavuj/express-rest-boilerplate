import { createHttpTerminator } from 'http-terminator';

import app from '../../src/app';
import logger from '../../src/common/utils/logger';
import AppDataSource from '../../src/database/config';

const port = process.env.PORT || 3000;

const server = app.listen(port, async () => {
  logger.info(`Server listening on PORT: ${port}, STAGE: ${process.env.NODE_ENV}`);

  try {
    await AppDataSource.initialize();
    logger.info('New Data Source initialized!');
  } catch (error: unknown) {
    throw new Error(
      (error as Error).message ? (error as Error).message : 'Error initializing Data Source',
    );
  }
});

const httpTerminator = createHttpTerminator({ server });

const exitHandler = async (code: number, reason: string, timeout = 5000): Promise<void> => {
  try {
    logger.error(`Attempting a graceful shutdown with code ${code}, reason: ${reason}`);

    // forces your application to exit, if the app fails to do it in the time specified by timeout parameter
    setTimeout(() => {
      logger.error(`Forcing exit with code ${code}, reason: ${reason}`);

      logger.error(`Exiting gracefully with code ${code}, reason: ${reason}`, () => {
        process.exit(code);
      });
    }, timeout).unref();

    logger.error(`Terminating HTTP connections`);

    await httpTerminator.terminate();

    if (AppDataSource.isInitialized) {
      logger.error(`Terminating Database connections`);

      await AppDataSource.destroy();
    }

    logger.error(`Exiting gracefully with code ${code}, reason: ${reason}`, () => {
      process.exit(code);
    });
  } catch (error: unknown) {
    logger.error(
      `Error shutting down gracefully, forcing exit with code ${code}, reason: ${reason}`,
      () => {
        process.exit(code);
      },
    );
  }
};

process.on('uncaughtException', () => {
  exitHandler(1, 'Unexpected Error', 5000);
});
process.on('unhandledRejection', () => {
  exitHandler(1, 'Unhandled Promise', 5000);
});
process.on('SIGTERM', () => {
  logger.error(`Process ${process.pid} received SIGTERM: Exiting with code 0`);

  exitHandler(0, 'SIGTERM', 5000);
});
process.on('SIGINT', () => {
  logger.error(`Process ${process.pid} received SIGINT: Exiting with code 0`);

  exitHandler(0, 'SIGINT', 5000);
});

export default server;
