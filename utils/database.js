/* eslint-disable no-console */
const { Sequelize } = require("@sequelize/core");
const { MySqlDialect } = require("@sequelize/mysql");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const db = new Sequelize({
  dialect: MySqlDialect,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: 3306,
});

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

db.sync()
  .then(() => {
    console.log("All models synced!");
  })
  .catch((error) => {
    console.error("Error when sync: ", error);
  });

module.exports = db;
