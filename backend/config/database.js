const dotenv = require('dotenv');
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const baseConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

// В продакшене (Render + TiDB Cloud) нужен SSL
const productionConfig = {
  ...baseConfig,
  ssl: {
    rejectUnauthorized: false
  }
};

// Выбор конфигурации
const config = isProduction ? productionConfig : baseConfig;

module.exports = config;