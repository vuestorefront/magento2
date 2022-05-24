import { getStyledConsolePrefix } from './style';

export type LogEntryVariant = 'error' | 'warn' | 'info' | 'debug' | 'none';

const partial = (fn: Function, ...args: unknown[]) => (...laterArgs: unknown[]) => fn(...args, ...laterArgs);

export const getLoggerWithVerbosity = (verbosity: LogEntryVariant) => {
  const noOperation = () => {};
  const matches = (verbosities: LogEntryVariant[]) => verbosities.includes(verbosity);
  return {
    debug: matches(['debug'])
      ? partial(console.debug, ...getStyledConsolePrefix('debug'))
      : noOperation,

    info: matches(['info', 'debug'])
      ? partial(console.info, ...getStyledConsolePrefix('info'))
      : noOperation,

    warn: matches(['info', 'warn', 'error'])
      ? partial(console.warn, ...getStyledConsolePrefix('warn'))
      : noOperation,

    error: matches(['info', 'warn', 'debug', 'error'])
      ? partial(console.error, ...getStyledConsolePrefix('error'))
      : noOperation,
  };
};

export const getVerbosity = (nodeEnv: string) : LogEntryVariant => {
  const defaultModes : Record<string, LogEntryVariant> = {
    // Test
    test: 'none',

    // Development
    dev: 'debug',
    development: 'debug',

    // Production
    prod: 'error',
    production: 'error',
  };
  return defaultModes[nodeEnv] ?? 'warn';
};
