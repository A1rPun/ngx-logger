import { TestBed, inject } from '@angular/core/testing';
import { ILoggerConfig, Logger, LogLevel } from '.';

describe('Logger', () => {
  let service: Logger;
  let config: ILoggerConfig;

  beforeEach(() => {
    config = {
      minimumLevel: LogLevel.verbose,
      fields: {
        global: 'constant',
        timestamp: () => +new Date(),
      },
    };
    service = new Logger(config);
  });

  it('should log no message', doneFn => {
    service.error();
    service.log.subscribe(logMessage => {
      expect(logMessage.message).toBe('');
      doneFn();
    });
  });

  it('should log an error message', doneFn => {
    const message = 'My error message';
    service.error(message);
    service.log.subscribe(logMessage => {
      expect(logMessage.level).toBe(LogLevel[LogLevel.error]);
      expect(logMessage.message).toBe(message);
      doneFn();
    });
  });

  it('should log a warning message', doneFn => {
    const message = 'My warning message';
    service.warning(message);
    service.log.subscribe(logMessage => {
      expect(logMessage.level).toBe(LogLevel[LogLevel.warning]);
      expect(logMessage.message).toBe(message);
      doneFn();
    });
  });

  it('should log an information message', doneFn => {
    const message = 'My information message';
    service.information(message);
    service.log.subscribe(logMessage => {
      expect(logMessage.level).toBe(LogLevel[LogLevel.information]);
      expect(logMessage.message).toBe(message);
      doneFn();
    });
  });

  it('should log a debug message', doneFn => {
    const message = 'My debug message';
    service.debug(message);
    service.log.subscribe(logMessage => {
      expect(logMessage.level).toBe(LogLevel[LogLevel.debug]);
      expect(logMessage.message).toBe(message);
      doneFn();
    });
  });

  it('should not log a debug message when minimumLevel is information (logs warning)', doneFn => {
    const message = 'My message';
    service.minimumLevel = LogLevel.information;
    service.debug(message);
    service.warning(message);
    service.log.subscribe(logMessage => {
      expect(logMessage.level).toBe(LogLevel[LogLevel.warning]);
      expect(logMessage.message).toBe(message);
      doneFn();
    });
  });

  it('should have extra fields in the log message', doneFn => {
    service.debug();
    service.log.subscribe(logMessage => {
      expect((<any>logMessage).global).toBe('constant');
      expect((<any>logMessage).timestamp).toBeTruthy();
      doneFn();
    });
  });
});
