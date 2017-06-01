# Angular x logger

## Configuration

First you need to configure the service in `app.module.ts`. You can pass optional configuration options with the static `withConfig()` function.

    import { environment } from './../environments/environment';
    import { LoggerModule, LogLevel } from 'logger';

    @NgModule({
      imports: [
        LoggerModule.withConfig({
          minimumLevel: environment.production
            ? LogLevel.information
            : LogLevel.verbose,
          fields: {
            global: 'constant',
            timestamp: () => +new Date(),
          },
        })
      ],
    })

## Usage

Then you can inject the logger in a component or a service:

    import { Logger } from 'logger';

    @Injectable()
    export class SomeService {
    
      constructor (private logger: Logger) {
        this.logger.information('Hello log!');
      }
    }

This will output the following object:

    {
      level: 'information',
      message: 'Hello log!',
      global: 'constant',
      timestamp: '1337133371337'
    }

## Output

    import { environment } from './../environments/environment';
    import { Logger } from 'logger';

    @Injectable()
    export class AppComponent implements OnInit {

      constructor (private logger: Logger) { }

      // Post to an endpoint somewhere on the internets
      logToEndpoint(logMessage: any): void {
        this.http.post(url, logMessage);
      }

      // Just log to the trusty console
      logToConsole(logMessage: any): void {
        console.log(`[${logMessage.timestamp}] ${logMessage.level} > ${logMessage.message}`);
      }

      ngOnInit(): void {
        const fn = (environment.production
          ? this.logToEndpoint
          : this.logToConsole).bind(this);
        this.logger.log.subscribe(fn);
      }
    }
    