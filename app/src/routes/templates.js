const express = require('express');
const router = express.Router();
const templatesController = require('../controllers/templatesController');

// Retorna todos os templates
router.get('/', templatesController.getAll);

// Retorna um template por ID
router.get('/:id', templatesController.getById);

// Cria um novo template
router.post('/', templatesController.create);

// Atualiza um template existente
router.put('/:id', templatesController.update);

// Remove um template existente
router.delete('/:id', templatesController.remove);

module.exports = router;
