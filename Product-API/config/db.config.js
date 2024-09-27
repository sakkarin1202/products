require("dotenv").config({ path: "../.env" });

module.exports = {
  HOST: process.env.HOST,
  // USER: process.env.USER,
  USER: 'posttest',
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
