import morgan from 'morgan';
import { createLogger, format, transports, addColors } from 'winston';
import 'winston-daily-rotate-file';

const { combine, colorize, timestamp, errors, printf, splat, metadata } = format;
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'cyan',
};

// Tell winston that you want to link the colors
addColors(colors);

// Custom formate logging
const formatter = ({ level, message, timestamp: time, metadata: meta }: any) => {
  let customFormat = `${time} | ${level} | ${message}`;
  if (meta) {
    if (meta.stack) {
      customFormat = `${customFormat} | ${meta.stack}`;
    } else if (
      meta instanceof Object
      && Object.entries(meta).length > 0
    ) {
      customFormat = `${customFormat} | ${JSON.stringify(meta)}`;
    }
  }
  return customFormat;
};

const Logger = createLogger({
  level: 'debug',
  format: combine(
    // error stack trace in metadata
    errors({ stack: true }),
    metadata(),
    // timestamp to logger
    timestamp(),
    // string interpolation
    splat(),
    printf(formatter),
  ),
  transports: [new transports.Console({ format:
    colorize({ all: true }),
  })],
});

if (process.env.NODE_ENV === 'production') {
  Logger.add(new transports.DailyRotateFile({
    filename: 'logs/error-logs-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '7d',
    level: 'error',
  }));
  Logger.add(new transports.DailyRotateFile({
    filename: 'logs/combined-logs-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '2d',
  }));
}

// Build the morgan middleware
export const httpLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream: {
    write: (message: string) => Logger.http(message),
  } },
);

export default Logger;
