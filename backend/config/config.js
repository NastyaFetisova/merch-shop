module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "rootpassword",
    database: process.env.DB_NAME || "merch_shop",
    host: process.env.DB_HOST || "db",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    dialectOptions: {
      connectTimeout: 120000 // 60 секунд (вместо стандартных 10)
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
