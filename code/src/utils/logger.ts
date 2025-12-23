type LogLevel = "info" | "warn" | "error" | "debug";

const log = (level: LogLevel, message: string, meta?: unknown) => {
  const payload = {
    level,
    message,
    meta,
    timestamp: new Date().toISOString(),
  };
  // Simple console logger for now; can swap for pino/winston later
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(payload));
};

export const logger = {
  info: (message: string, meta?: unknown) => log("info", message, meta),
  warn: (message: string, meta?: unknown) => log("warn", message, meta),
  error: (message: string, meta?: unknown) => log("error", message, meta),
  debug: (message: string, meta?: unknown) => log("debug", message, meta),
};

