export enum LogLevel {
  ERROR = "ERROR",
  WARN = "WARN",
  INFO = "INFO",
  DEBUG = "DEBUG"
}

export const LOG_LEVELS = new Map<LogLevel, number>([
  [LogLevel.ERROR, 200],
  [LogLevel.WARN, 300],
  [LogLevel.INFO, 400],
  [LogLevel.DEBUG, 500]
]);
