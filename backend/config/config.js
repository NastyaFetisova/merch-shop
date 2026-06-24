module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  test: {
    username: "root",
    password: "",
    database: "merch_shop_test",
    host: "localhost",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: "",
    database: "merch_shop_production",
    host: "localhost",
    dialect: "mysql"
  }
};