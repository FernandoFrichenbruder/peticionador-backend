require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  mysql: {
    host: process.env.MYSQL_HOST || 'db',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'root',
    database: process.env.MYSQL_DB || 'peticionador',
  }
};
