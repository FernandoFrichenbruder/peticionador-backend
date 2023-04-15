const express = require("express");
const cors = require('cors');
const router = require("./src/routes");
const app = express();
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
app.use(express.json());
app.use(cors(corsOptions));
app.use(router);

const port = process.env.PORT || 3001;
app.listen(port, () => {
console.log("Servidor iniciado na porta: " +  port);
});