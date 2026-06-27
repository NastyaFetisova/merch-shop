const database = require('./database');

const base = {
  username: database.user,
  password: database.password,
  database: database.database,
  host: database.host,
  port: database.port,
  dialect: "mysql"
};

module.exports = {
  development: base,

  test: {
    username: "root",
    password: "",
    database: "merch_shop_test",
    host: "localhost",
    dialect: "mysql"
  },

  production: {
    ...base,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};