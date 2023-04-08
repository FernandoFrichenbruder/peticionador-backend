const express = require('express');
const router = express.Router();
const documentsController = require('../controllers/documentController');

router.get('/', documentsController.list);
router.post('/', documentsController.create);
router.get('/:id', documentsController.getById);
router.put('/:id', documentsController.update);
router.delete('/:id', documentsController.delete);

module.exports = router;
