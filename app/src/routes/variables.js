const express = require('express');
const router = express.Router();
const variableController = require('../controllers/variableController');

router.get('/', variableController.list);
router.get('/:id', variableController.getById);
router.post('/', variableController.create);
router.put('/:id', variableController.update);
router.delete('/:id', variableController.delete);

module.exports = router;