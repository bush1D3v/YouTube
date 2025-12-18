const { Sequelize } = require("sequelize");
const { DATABASE_URL } = require("./env");

const isTest = process.env.NODE_ENV === "test";

const sequelize = isTest
  ? new Sequelize("sqlite::memory:", { logging: false })
  : new Sequelize(DATABASE_URL, {
      dialect: "postgres",
      logging: false
    });

module.exports = { sequelize };
