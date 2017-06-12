import { LogLevel } from '.';

export interface ILoggerConfig {
  fields?: {};
  logSize?: number;
  minimumLevel?: LogLevel | number;
}
