import { getLoggerWithVerbosity, getVerbosity } from './verbosity';

const verbosity = getVerbosity(process.env.NODE_ENV);
export const Logger = getLoggerWithVerbosity(verbosity);
