/**
 * Production-safe logging utility
 * Provides different log levels and can be configured for different environments
 */

export type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: Date;
  context?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";
  private isTest = process.env.NODE_ENV === "test";

  private shouldLog(level: LogLevel): boolean {
    if (this.isTest) return false;

    // In production, only log warnings and errors
    if (!this.isDevelopment) {
      return level === "warn" || level === "error";
    }

    return true;
  }

  private formatMessage(entry: LogEntry): string {
    const timestamp = entry.timestamp.toISOString();
    const context = entry.context ? `[${entry.context}]` : "";
    return `${timestamp} ${entry.level.toUpperCase()} ${context} ${entry.message}`;
  }

  private log(level: LogLevel, message: string, data?: any, context?: string) {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date(),
      context,
    };

    const formattedMessage = this.formatMessage(entry);

    switch (level) {
      case "debug":
        console.debug(formattedMessage, data);
        break;
      case "info":
        console.info(formattedMessage, data);
        break;
      case "warn":
        console.warn(formattedMessage, data);
        break;
      case "error":
        console.error(formattedMessage, data);
        break;
    }

    // In production, you might want to send errors to an external service
    if (!this.isDevelopment && level === "error") {
      this.reportError(entry);
    }
  }

  private reportError(entry: LogEntry) {
    // This would integrate with error reporting services like Sentry
    // For now, we'll just ensure the error is logged
    try {
      // Example: Send to error reporting service
      // errorReportingService.captureException(entry);
    } catch (reportingError) {
      // Fallback to console if error reporting fails
      console.error("Failed to report error:", reportingError);
    }
  }

  debug(message: string, data?: any, context?: string) {
    this.log("debug", message, data, context);
  }

  info(message: string, data?: any, context?: string) {
    this.log("info", message, data, context);
  }

  warn(message: string, data?: any, context?: string) {
    this.log("warn", message, data, context);
  }

  error(message: string, data?: any, context?: string) {
    this.log("error", message, data, context);
  }

  // Convenience method for performance logging
  time(label: string, context?: string) {
    if (!this.isDevelopment) return () => {};

    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      this.debug(
        `${label} took ${duration.toFixed(2)}ms`,
        { duration },
        context
      );
    };
  }

  // Method to create a contextual logger
  withContext(context: string) {
    return {
      debug: (message: string, data?: any) =>
        this.debug(message, data, context),
      info: (message: string, data?: any) => this.info(message, data, context),
      warn: (message: string, data?: any) => this.warn(message, data, context),
      error: (message: string, data?: any) =>
        this.error(message, data, context),
      time: (label: string) => this.time(label, context),
    };
  }
}

// Export singleton instance
export const logger = new Logger();

// Export convenience functions
export const { debug, info, warn, error } = logger;

// Export contextual logger creator
export const createLogger = (context: string) => logger.withContext(context);

// Performance timing utility
export const timeFunction = <T extends (...args: any[]) => any>(
  fn: T,
  label: string,
  context?: string
): T => {
  return ((...args: any[]) => {
    const endTimer = logger.time(label, context);
    try {
      const result = fn(...args);

      // Handle async functions
      if (result instanceof Promise) {
        return result.finally(() => endTimer());
      }

      endTimer();
      return result;
    } catch (_error) {
      endTimer();
      throw _error;
    }
  }) as T;
};

// Development-only logging
export const devLog = (message: string, data?: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[DEV] ${message}`, data);
  }
};

// Production-safe assertion
export const assert = (condition: boolean, message: string, data?: any) => {
  if (!condition) {
    logger.error(`Assertion failed: ${message}`, data);
    if (process.env.NODE_ENV === "development") {
      throw new Error(`Assertion failed: ${message}`);
    }
  }
};
