import {inject, Injectable} from '@angular/core';
import {LogLevel} from './log-level';
import {SettingsService} from '../../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private logLevelConfigure: LogLevel = inject(SettingsService).getLogLevel();

  public error(message: string): void {
    if (this.logLevelConfigure >= LogLevel.ERROR) {
      console.error(this.formatMessage(LogLevel.ERROR, message));
    }
  }

  public errorWithError(message: string, error: any): void {
    const errorMessage: string = (error instanceof Error) ? ` ${error.name} : ${error.message}` : "Unknown error";
    this.error(`${message}  --  ${errorMessage}`)
  }

  public warn(message: string): void {
    if (this.logLevelConfigure >= LogLevel.WARN) {
      console.warn(this.formatMessage(LogLevel.WARN, message));
    }
  }

  public info(message: string): void {
    if (this.logLevelConfigure >= LogLevel.INFO) {
      console.log(this.formatMessage(LogLevel.INFO, message));
    }
  }

  public debug(message: string): void {
    if (this.logLevelConfigure >= LogLevel.DEBUG) {
      console.log(this.formatMessage(LogLevel.DEBUG, message));
    }
  }

  public trace(message: string): void {
    if (this.logLevelConfigure >= LogLevel.TRACE) {
      console.log(this.formatMessage(LogLevel.TRACE, message));
    }
  }

  private formatMessage(level: LogLevel, message: string): string {
    return `${new Date().toISOString()}  ${LogLevel[level]}  ---  ${message}`;
  }
}
