import {Injectable} from '@angular/core';
import {LogLevel} from '../shared/logger/log-level';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  public getLogLevel(): LogLevel {
    // FIXME
    return LogLevel.TRACE;
  }
}
