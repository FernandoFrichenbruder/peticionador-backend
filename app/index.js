const express = require("express");
const Sequelize = require("sequelize");
const sequelize = require("./config/db-connect");
const router = require("./src/routes");
const app = express();

app.use(express.json());
app.use(router);

const port = process.env.PORT || 3001;
app.listen(port, () => {
console.log("Servidor iniciado na porta: " +  port);
});