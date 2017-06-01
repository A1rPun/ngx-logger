export enum LogLevel {
  // Mute all levels
  off,
  // Use Error to log all unhandled exceptions.
  // This is typically logged inside a catch block at the boundary of your application.
  error,
  // Use warning for handled exceptions.
  // This often happens when you expect an exception and the application can continue.
  // But you then want to log a warning so it can be fixed in the future.
  warning,
  // Use info as information for S&B.
  // Usually one would also use Info to log Entry and Exit points of the applications.
  information,
  // Debug logging should not be active on our production systems.
  // The debug level should be used to add relevant information for debugging purposes during development.
  debug,
  // This is the most Verbose Log level (Maximum Volume).
  verbose,
}
