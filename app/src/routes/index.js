const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Importa os módulos de roteamento
const usersRouter = require('./users');
const categoriesRouter = require('./categories');
const documentsRouter = require('./documents');
const templatesRouter = require('./templates');
const variablesRouter = require('./variables');

// Monta as rotas no aplicativo
router.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

// router.use('/users', usersRouter);
// router.use('/categories', authMiddleware, categoriesRouter);
// router.use('/peticoes', authMiddleware, peticoesRouter);
// router.use('/templates', authMiddleware, templatesRouter);
// router.use('/variables', authMiddleware, variablesRouter);

// Cria todas as rotas sem o authMiddleware, para fins de testes.
router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);
router.use('/documents', documentsRouter);
router.use('/templates', templatesRouter);
router.use('/variables', variablesRouter);

module.exports = router;