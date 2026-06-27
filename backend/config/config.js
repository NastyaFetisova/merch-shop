const database = require('./database');

module.exports = {
  development: database,
  test: {
    username: "root",
    password: "",
    database: "merch_shop_test",
    host: "localhost",
    dialect: "mysql"
  },
  production: {
    ...database,
    dialect: "mysql"
  }
};
