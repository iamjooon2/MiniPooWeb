require('dotenv').config();

const development = {
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.LOCALHOST,
  port : process.env.PORT,
  dialect: "mysql"
}

const test = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_LOCALHOST,
  dialect: "mysql",
  //port: env.MYSQL_PORT
};

const production = {
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
  //port: env.MYSQL_PORT
};

module.exports = { development, test, production};