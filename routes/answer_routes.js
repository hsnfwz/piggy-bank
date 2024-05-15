const express = require('express');
const AnswerController = require('../controllers/answer_controller');

const router = express.Router();

router.get('/', AnswerController.handleGetAllRows);
router.get('/:id', AnswerController.handleGetRowById);
router.post('/', AnswerController.handleInsertRow);
router.put('/:id', AnswerController.handleUpdateRowById);
router.delete('/:id', AnswerController.handleDeleteRowById);
router.all('*', AnswerController.handle404NotFound);

module.exports = router;
