import { Inject, Injectable, Optional } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ILoggerConfig, ILogMessage, LogLevel } from '.';

@Injectable()
export class Logger {

  log: ReplaySubject<ILogMessage>;
  minimumLevel: LogLevel | number = LogLevel.verbose;
  private fields = {};

  constructor(
    @Inject('LOGGER_CONFIG') config: ILoggerConfig = {}
  ) {
    if (config.minimumLevel && config.minimumLevel !== LogLevel.off) {
      this.minimumLevel = config.minimumLevel;
    }

    if (config.fields) {
      this.fields = config.fields;
    }
    this.log = new ReplaySubject<ILogMessage>();
  }

  error(...args: any[]): Logger {
    return this.doLog(LogLevel.error, ...args);
  }

  warning(...args: any[]): Logger {
    return this.doLog(LogLevel.warning, ...args);
  }

  information(...args: any[]): Logger {
    return this.doLog(LogLevel.information, ...args);
  }

  debug(...args: any[]): Logger {
    return this.doLog(LogLevel.debug, ...args);
  }

  private doLog(level: LogLevel, ...args: any[]): Logger {
    if (level > this.minimumLevel) {
      return this;
    }
    const logMessage = this.augmentMessage({
      level: LogLevel[level],
      message: `${args}`,
    });
    this.log.next(logMessage);
    return this;
  }

  private augmentMessage(logMessage: ILogMessage): ILogMessage {
    for (const key in this.fields) {
      if (this.fields.hasOwnProperty(key)) {
        const value = this.fields[key];
        logMessage[key] = typeof value === 'function' ? value() : value;
      }
    }
    return logMessage;
  }
}
