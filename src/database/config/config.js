require('dotenv').config();

const environment = process.env.NODE_ENV;

const suffix = {
  prod: "",
  production: "",
  dev: "-dev",
  development: "-dev",
  test: "-test",
};

const options = {
  host: process.env.MYSQL_HOST || 'mysql',
  port: process.env.MYSQL_PORT || '3306',
  database: 
    `${process.env.MYSQL_DB_NAME || 'tobias-project'}${suffix[environment] || suffix.dev}`,
  username: process.env.MYSQL_USER || 'b24ec32657ac79',
  password: process.env.MYSQL_PASSWORD || 'df457fc5',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};
