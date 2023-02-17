const express = require('express');
const app = express();

// Importa os módulos de roteamento
const usersRouter = require('./users');
const categoriesRouter = require('./categories');
const peticoesRouter = require('./peticoes');
const templatesRouter = require('./templates');

// Monta as rotas no aplicativo
router.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/peticoes', peticoesRouter);
app.use('/templates', templatesRouter);

module.exports = router;