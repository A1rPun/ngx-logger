import { ILoggerConfig } from './logger.config.interface';
import { Logger } from './logger';
import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({
  providers: [
    Logger
  ],
})
export class LoggerModule {
  static withConfig(userConfig: ILoggerConfig = {}): ModuleWithProviders {
    return {
      ngModule: LoggerModule,
      providers: [
        { provide: 'LOGGER_CONFIG', useValue: userConfig }
      ],
    };
  }
}
