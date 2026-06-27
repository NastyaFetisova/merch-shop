const database = require('./database');

module.exports = {
  development: {
    username: database.user,
    password: database.password,
    database: database.database,
    host: database.host,
    port: database.port,
    dialect: "mysql"
  },

  test: {
    username: "root",
    password: "",
    database: "merch_shop_test",
    host: "localhost",
    dialect: "mysql"
  },

  production: {
    username: database.user,
    password: database.password,
    database: database.database,
    host: database.host,
    port: database.port,
    dialect: "mysql",

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};