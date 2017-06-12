import { Inject, Injectable, Optional } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ILoggerConfig, ILogMessage, LogLevel } from '.';

@Injectable()
export class Logger {

  minimumLevel: LogLevel | number;
  private fields: any;
  private log: ReplaySubject<ILogMessage>;
  private logSize: number;

  constructor(
    @Inject('LOGGER_CONFIG') config: ILoggerConfig = {}
  ) {
    this.fields = config.fields ? config.fields : {};
    this.logSize = config.logSize ? config.logSize : null;
    this.minimumLevel = config.minimumLevel || config.minimumLevel === LogLevel.off
      ? config.minimumLevel
      : LogLevel.verbose;
    this.log = new ReplaySubject<ILogMessage>(this.logSize);
  }

  debug(...args: any[]): Logger {
    return this.doLog(LogLevel.debug, ...args);
  }

  error(...args: any[]): Logger {
    return this.doLog(LogLevel.error, ...args);
  }

  info(...args: any[]): Logger {
    return this.doLog(LogLevel.info, ...args);
  }

  logTo(sink: (logMessage: ILogMessage) => void): Logger {
    this.log.subscribe(sink);
    return this;
  }

  setField(key: string, value: any): Logger {
    this.fields[key] = value;
    return this;
  }

  warn(...args: any[]): Logger {
    return this.doLog(LogLevel.warn, ...args);
  }

  private doLog(level: LogLevel, ...args: any[]): Logger {
    if (level <= this.minimumLevel) {
      const logMessage = this.enhanceMessage({
        level: LogLevel[level],
        message: `${args}`,
      });
      this.log.next(logMessage);
    }
    return this;
  }

  private enhanceMessage(logMessage: ILogMessage): ILogMessage {
    for (const key in this.fields) {
      if (this.fields.hasOwnProperty(key)) {
        const value = this.fields[key];
        logMessage[key] = typeof value === 'function' ? value() : value;
      }
    }
    return logMessage;
  }
}
