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
    service.logTo(logMessage => {
      expect(logMessage.message).toBe('');
      doneFn();
    });
  });

  it('should log an error message', doneFn => {
    const message = 'My error message';
    service.error(message);
    service.logTo(logMessage => {
      expect(logMessage.level).toBe(LogLevel[LogLevel.error]);
      expect(logMessage.message).toBe(message);
      doneFn();
    });
  });

  it('should log a warning message', doneFn => {
    const message = 'My warning message';
    service.warn(message);
    service.logTo(logMessage => {
      expect(logMessage.level).toBe(LogLevel[LogLevel.warn]);
      expect(logMessage.message).toBe(message);
      doneFn();
    });
  });

  it('should log an information message', doneFn => {
    const message = 'My information message';
    service.info(message);
    service.logTo(logMessage => {
      expect(logMessage.level).toBe(LogLevel[LogLevel.info]);
      expect(logMessage.message).toBe(message);
      doneFn();
    });
  });

  it('should log a debug message', doneFn => {
    const message = 'My debug message';
    service.debug(message);
    service.logTo(logMessage => {
      expect(logMessage.level).toBe(LogLevel[LogLevel.debug]);
      expect(logMessage.message).toBe(message);
      doneFn();
    });
  });

  it('should not log a debug message when minimumLevel is information (logs warning)', doneFn => {
    const message = 'My message';
    service.minimumLevel = LogLevel.info;
    service.debug(message);
    service.warn(message);
    service.logTo(logMessage => {
      expect(logMessage.level).toBe(LogLevel[LogLevel.warn]);
      expect(logMessage.message).toBe(message);
      doneFn();
    });
  });

  it('should have extra fields in the log message', doneFn => {
    service.debug();
    service.logTo((logMessage: any) => {
      expect(logMessage.global).toBe('constant');
      expect(logMessage.timestamp).toBeTruthy();
      doneFn();
    });
  });
});
