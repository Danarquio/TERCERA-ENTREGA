import winston from 'winston';

// Niveles de logging
const levels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  http: 4,
  debug: 5,
};

// Formato de logging
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

// Crear los transportes
const transports = [
  new winston.transports.Console({ level: process.env.NODE_ENV === 'development' ? 'debug' : 'info' }),
  new winston.transports.File({ filename: 'errors.log', level: 'error' }),
];

// Crear el logger
const logger = winston.createLogger({
  level: 'debug',
  levels,
  format,
  transports,
});

export default logger;
