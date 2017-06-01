import { LogLevel } from '.';

export interface ILoggerConfig {
  minimumLevel?: LogLevel | number;
  fields?: {};
}
