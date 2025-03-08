import { Injectable } from '@angular/core';

enum LogLevel {
  ERROR = 200,
  WARN = 300,
  INFO = 400,
  DEBUG = 500
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  public error(loggerName: string, message: string): void {
    console.error(this.formatMessage(loggerName, LogLevel.ERROR, message));
  }

  public warn(loggerName: string, message: string): void {
    console.warn(this.formatMessage(loggerName, LogLevel.WARN, message));
  }

  public info(loggerName: string, message: string): void {
    console.log(this.formatMessage(loggerName, LogLevel.INFO, message));
  }

  public debug(loggerName: string, message: string): void {
      console.log(this.formatMessage(loggerName, LogLevel.DEBUG, message));
  }

  private formatMessage(loggerName: string, level: LogLevel, message: string): string {
    return `${new Date().toISOString()}  ${LogLevel[level]}  ---  [${loggerName}] ${message}`;
  }
}
