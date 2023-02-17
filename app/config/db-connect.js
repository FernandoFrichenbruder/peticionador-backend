const Sequelize = require("sequelize");
const config = require("./index");

const sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
    host: config.mysql.host,
    dialect: "mysql",
    migrationPath: '../database/migrations'
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados estabelecida com sucesso.");
    })
    .catch(err => {
        console.error("Erro ao estabelecer conexão com o banco de dados:", err);
    });

module.exports = sequelize;