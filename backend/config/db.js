const mysql = require('mysql2/promise');
const databaseConfig = require('./database');

const pool = mysql.createPool({
    ...config,
    waitForConnections: true,
    connectionLimit: 10,
});

module.exports = pool;