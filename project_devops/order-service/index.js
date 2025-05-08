require('./tracing');

const express = require('express');
const winston = require('winston');
const axios = require('axios');

const app = express();
const port = 5002;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()]
});

app.get('/', async (req, res) => {
  try {
    logger.info('Order service root route hit');
    const response = await axios.get('http://user-service:5001/');
    res.send(`Order received. Also got response from user-service: ${response.data}`);
  } catch (err) {
    logger.error('Error calling user-service', err);
    res.status(500).send('Error reaching user-service');
  }
});

app.listen(port, () => {
  logger.info(`Order service listening on port ${port}`);
});
