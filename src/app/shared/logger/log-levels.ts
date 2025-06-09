export enum LOG_LEVEL {
  ERROR = "ERROR",
  WARN = "WARN",
  INFO = "INFO",
  DEBUG = "DEBUG"
}

export const LOG_LEVELS = new Map<LOG_LEVEL, number>([
  [LOG_LEVEL.ERROR, 200],
  [LOG_LEVEL.WARN, 300],
  [LOG_LEVEL.INFO, 400],
  [LOG_LEVEL.DEBUG, 500]
]);
