const express = require('express');
const router = express.Router();
const templatesController = require('../controllers/templateController');

router.get('/', templatesController.list);
router.get('/:id', templatesController.getById);
router.post('/', templatesController.create);
router.put('/:id', templatesController.update);
router.delete('/:id', templatesController.delete);
module.exports = router;
