const mysql = require('mysql2/promise');
const databaseConfig = require('./database');

const pool = mysql.createPool({
    ...databaseConfig,
    waitForConnections: true,
    connectionLimit: 10,
});

module.exports = pool;