# Angular x logger

This logger strifes to have a clean API and a way to configure the message and the output at a single place.

***Features***
- Simple API with `debug()` `info()` `warn()` `error()`
- Output to any sink you prefer with `logTo()`
- Configure extra fields to enhance the message

***Dependencies***
- @angular/common
- @angular/core
- rxjs

## Configuration

First you need to configure the service in `app.module.ts`. You can pass optional configuration options with the static `withConfig()` function.

    import { environment } from './../environments/environment';
    import { LoggerModule, LogLevel } from 'ngx-logger';

    @NgModule({
      imports: [
        LoggerModule.withConfig({
          // These fields will be included in every log message
          fields: {
            app: 'MyApp',
            timestamp: () => Date.now(),
          },
          // The buffer size of the logs in memory
          logSize: 10, 
          // The minimum log level that will be outputted. `verbose` is all, `off` will log nothing.
          minimumLevel: environment.production
            ? LogLevel.information
            : LogLevel.verbose,
        })
      ],
    })

## Usage

Then you can inject the logger in a component or a service.

    import { Logger } from 'ngx-logger';

    @Injectable()
    export class SomeService {
    
      constructor (private logger: Logger) {
        this.logger.information('Hello log!');
      }
    }

## Output

One can call `logTo` to get all logged messages and output the stream to the sink.

    import { environment } from './../environments/environment';
    import { Logger } from 'ngx-logger';

    @Component()
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

      // Log to a different sink based on the environment
      ngOnInit(): void {
        const sink = environment.production
          ? this.logToEndpoint
          : this.logToConsole;
        this.logger.logTo(sink);
      }
    }
    
On production this will post the following message to the endpoint:

    {
      'level': 'info',
      'message': 'Hello log!',
      'app': 'MyApp',
      'timestamp': '1337133371337'
    }

On other environments it will output this message to the console:

    [1337133371337] info > Hello log!

## API

#### logger.error()
#### logger.warn()
#### logger.info()
#### logger.debug()

#### logger.logTo()
#### logger.setField()

## Log levels
#### LogLevel.off = 0
Mute all levels
#### LogLevel.error = 1
Use Error to log all unhandled exceptions.
This is typically logged inside a catch block at the boundary of your application.
#### LogLevel.warn = 2
Use warning for handled exceptions.
This often happens when you expect an exception and the application can continue.
But you then want to log a warning so it can be fixed in the future.
#### LogLevel.info = 3
Use info as information for S&B.
Usually one would also use Info to log Entry and Exit points of the applications.
#### LogLevel.debug = 4
Debug logging should not be active on our production systems.
The debug level should be used to add relevant information for debugging purposes during development.
#### LogLevel.verbose = 5
This is the most Verbose Log level (Maximum Volume).
