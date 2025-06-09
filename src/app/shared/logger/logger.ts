import {LogLevel, LOG_LEVELS} from './log-levels';
import {KeysLocalStorage} from '../../storage/local-storage-keys';

const DEFAULT_LOG_LEVEL: number = 300;

export class Logger {

  private readonly loggerName: string;
  private readonly logLevelConfigure: number;

  constructor(loggerName: string) {
    this.loggerName = loggerName;
    this.logLevelConfigure = this.readLogLevel();
  }

  public error(message: string): void {
    if (this.logLevelConfigure >= (LOG_LEVELS.get(LogLevel.ERROR) ?? 0) ) {
      console.error(this.formatMessage(LogLevel.ERROR, message));
    }
  }

  public errorWithError(message: string, error: any): void {
    const errorMessage: string = (error instanceof Error) ? ` ${error.name} : ${error.message}` : "Unknown error";
    this.error(`${message}  --  ${errorMessage}`)
  }

  public warn(message: string): void {
    if (this.logLevelConfigure >= (LOG_LEVELS.get(LogLevel.WARN) ?? 0) ) {
      console.warn(this.formatMessage(LogLevel.WARN, message));
    }
  }

  public info(message: string): void {
    if (this.logLevelConfigure >= (LOG_LEVELS.get(LogLevel.INFO) ?? 0) ) {
      console.log(this.formatMessage(LogLevel.INFO, message));
    }
  }

  public debug(message: string): void {
    if (this.logLevelConfigure >= (LOG_LEVELS.get(LogLevel.DEBUG) ?? 0) ) {
      console.log(this.formatMessage(LogLevel.DEBUG, message));
    }
  }

  private formatMessage(level: string, message: string): string {
    return `${new Date().toISOString()}  ${level}  ---  ${this.loggerName}  :  ${message}`;
  }

  private readLogLevel(): number {
    const key: string | null = window.localStorage.getItem(KeysLocalStorage.logLevel);
    if (key) {
      return LOG_LEVELS.get(key as LogLevel) ?? DEFAULT_LOG_LEVEL;
    }
    return DEFAULT_LOG_LEVEL;
  }
}
