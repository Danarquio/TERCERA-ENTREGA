import 'dotenv/config'
import app from './app.js';
import logger from './config/logger.js';

// Inicia la aplicación
const PORT = 8080;
app.listen(PORT, () => logger.info('Listen puerto 8080'));
