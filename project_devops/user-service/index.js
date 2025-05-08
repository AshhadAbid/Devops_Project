require('./tracing');

const express = require('express');
const winston = require('winston');

const app = express();
const port = 5001;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()]
});

app.get('/', (req, res) => {
  logger.info('User service root route hit');
  res.send('Hello from User Service');
});

app.listen(port, () => {
  logger.info(`User service listening on port ${port}`);
});
