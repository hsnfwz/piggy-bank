const express = require('express');
const AskQuestionController = require('../controllers/ask_question_controller');

const router = express.Router();

router.get('/', AskQuestionController.handleGetAllRows);
router.get('/:id', AskQuestionController.handleGetRowById);
router.post('/', AskQuestionController.handleInsertRow);
router.put('/:id', AskQuestionController.handleUpdateRowById);
router.delete('/:id', AskQuestionController.handleDeleteRowById);
router.all('*', AskQuestionController.handle404NotFound);

module.exports = router;
