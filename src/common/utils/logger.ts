import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import Environment from '../enums/Environment';

const ignoreError = winston.format((info) => {
  if (info.level === 'error') {
    return false;
  }

  return info;
});

const transportFileError: DailyRotateFile = new DailyRotateFile({
  filename: 'logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'error',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
});

const transportFileSilly: DailyRotateFile = new DailyRotateFile({
  filename: 'logs/combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'silly',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json(), ignoreError()),
});

const logger = winston.createLogger({
  level: 'silly',
  transports: [transportFileError, transportFileSilly],
});

if (process.env.NODE_ENV !== Environment.Production) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.colorize(),
        winston.format.splat(),
        winston.format.printf((info) => {
          const { timestamp, level, message, ...meta } = info;

          return `${timestamp} [${level}]: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
          }`;
        }),
      ),
    }),
  );
}

export default logger;
