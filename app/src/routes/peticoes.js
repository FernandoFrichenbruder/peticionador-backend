const express = require('express');
const router = express.Router();
const peticoesController = require('../controllers/peticoesController');

router.get('/', peticoesController.listPeticoes);
router.post('/', peticoesController.createPeticoes);
router.get('/:id', peticoesController.getPeticoesById);
router.put('/:id', peticoesController.updatePeticoes);
router.delete('/:id', peticoesController.removePeticoes);

module.exports = router;
