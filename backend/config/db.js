const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const baseConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
};

// Для продакшена добавляем SSL (нужно для TiDB Cloud)
const productionConfig = {
    ...baseConfig,
    ssl: {
        rejectUnauthorized: false
    }
};

// Выбираем конфигурацию в зависимости от окружения
const config = isProduction ? productionConfig : baseConfig;

const pool = mysql.createPool(config);

module.exports = pool;