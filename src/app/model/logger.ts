import {LogLevel} from '../enums/log-level';

export class Logger {

  private loggerName: string;

  constructor(loggerName: string) {
    this.loggerName = loggerName;
  }

  public error(message: string): void {
    console.error(this.formatMessage(LogLevel.ERROR, message));
  }

  public errorWithError(message: string, error: any): void {
    const errorMessage: string = (error instanceof Error) ? ` ${error.name} : ${error.message}` : "Unknown error";
    this.error(`${message}  --  ${errorMessage}`)
  }

  public warn(message: string): void {
    console.warn(this.formatMessage(LogLevel.WARN, message));
  }

  public info(message: string): void {
    console.log(this.formatMessage(LogLevel.INFO, message));
  }

  public debug(message: string): void {
    console.log(this.formatMessage(LogLevel.DEBUG, message));
  }

  private formatMessage(level: LogLevel, message: string): string {
    return `${new Date().toISOString()}  ${LogLevel[level]}  ---  [${this.loggerName}] ${message}`;
  }

}
