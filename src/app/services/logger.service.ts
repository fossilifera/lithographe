import { Injectable } from '@angular/core';
import {LogLevel} from '../enums/log-level';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  public error(loggerName: string, message: string): void {
    console.error(this.formatMessage(loggerName, LogLevel.ERROR, message));
  }
  public errorWithError(loggerName: string, message: string, error: any): void {
    const errorMessage: string = (error instanceof Error) ? ` ${error.name} : ${error.message}` : "Unknown error";
    this.error(loggerName, `${message}  --  ${errorMessage}`)
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
