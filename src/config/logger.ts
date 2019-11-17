import { createLogger, format, transports, level, addColors } from 'winston';
const {
  combine,
  timestamp,
  label,
  json,
  prettyPrint,
  colorize,
  printf
} = format;

// Configuration (levels, transports, etc)
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    help: 2,
    data: 3,
    info: 4,
    debug: 5,
    prompt: 6,
    verbose: 7,
    input: 8,
    trace: 9
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    help: 'cyan',
    data: 'grey',
    info: 'green',
    debug: 'blue',
    prompt: 'grey',
    verbose: 'cyan',
    input: 'grey',
    trace: 'magenta'
  }
};
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
const myFormat2 = printf(({ level, message, label, timestamp }) => {
  return `Timestamp:  ${timestamp} 
            Label:      [${label}] 
            Level:      ${level} 
            Message:    ${JSON.stringify(message)}`;
});
const errorFileOptions: transports.FileTransportOptions = {
  filename: 'logs/error.log',
  level: 'error',
  handleExceptions: true,
  options: {},
  format: combine(
    label({ label: 'LOGGER' }),
    timestamp(),
    prettyPrint(),
    colorize()
  )
};
const combinedFileOptions: transports.FileTransportOptions = {
  filename: 'logs/combined.log',
  level: 'verbose',
  handleExceptions: true,
  options: {},
  format: combine(
    label({ label: 'LOGGER' }),
    timestamp(),
    prettyPrint(),
    colorize()
  )
};
const consoleOptions: transports.ConsoleTransportOptions = {
  level: 'info',
  handleExceptions: true,
  format: combine(
    label({ label: 'LOGGER' }),
    timestamp(),
    prettyPrint(),
    colorize(),
    myFormat
  )
};

// Create logger and attach transports
const logger = createLogger({
  level: 'info',
  levels: customLevels.levels,
  defaultMeta: { application: 'eworkload' },
  transports: [
    new transports.File(errorFileOptions),
    new transports.File(combinedFileOptions),
    new transports.Console(consoleOptions)
  ],
  exitOnError: true
});
addColors(customLevels.colors);

export { logger };
